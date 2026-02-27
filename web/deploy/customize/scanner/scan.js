/* ============================================
   AXON. — Foot Scanner (Phone)
   Camera → A4 detection → Foot measurement → Send
   ============================================ */

(function () {
    'use strict';

    /* ---- Constants ---- */
    const A4_RATIO = 1.414;          // height / width
    const A4_WIDTH_MM = 210;
    const A4_TOLERANCE = 0.20;       // 20% aspect ratio tolerance
    const WHITE_THRESH = 190;        // R,G,B all above this = white
    const FOOT_DARK_THRESH = 160;    // below this within paper = foot
    const SAMPLE_INTERVAL = 200;     // ms between detection frames
    const PROCESS_DELAY = 1800;      // ms for processing animation
    const STABLE_FRAMES = 5;         // frames paper must be stable

    /* ---- State ---- */
    const State = {
        CONNECTING: 'CONNECTING',
        CAMERA_INIT: 'CAMERA_INIT',
        SCANNING: 'SCANNING',
        PAPER_FOUND: 'PAPER_FOUND',
        READY: 'READY',
        CAPTURED: 'CAPTURED',
        PROCESSING: 'PROCESSING',
        RESULTS: 'RESULTS',
        SENT: 'SENT'
    };

    let state = State.CONNECTING;
    let stream = null;
    let peer = null;
    let conn = null;
    let bc = null;              // BroadcastChannel
    let detectionLoop = null;
    let paperStableCount = 0;
    let footDetectedCount = 0;
    let lastMeasurement = null;

    /* ---- DOM ---- */
    const $ = id => document.getElementById(id);
    const video = $('camera-feed');
    const processCanvas = $('process-canvas');
    const ctx = processCanvas.getContext('2d', { willReadFrequently: true });
    const guide = $('a4-guide');
    const guideLabel = $('guide-label');
    const statusDot = $('status-dot');
    const statusText = $('status-text');
    const captureBtn = $('capture-btn');
    const connectingScreen = $('connecting-screen');
    const processingScreen = $('processing-screen');
    const resultsScreen = $('results-screen');
    const sentScreen = $('sent-screen');
    const resultsData = $('results-data');
    const sendBtn = $('send-btn');
    const rescanBtn = $('rescan-btn');
    const errorToast = $('error-toast');
    const sessionId = $('session-id');

    /* ---- URL params ---- */
    const params = new URLSearchParams(window.location.search);
    const peerId = params.get('p');         // desktop peer ID
    const isDirect = params.get('direct') === 'true';

    /* ============================================
       STATE MACHINE
       ============================================ */

    function setState(newState) {
        state = newState;

        // Reset UI classes
        guide.className = 'sc-guide';
        statusDot.className = 'sc-status-dot';
        statusText.className = 'sc-status-text';
        captureBtn.disabled = true;
        captureBtn.className = 'sc-capture';

        switch (state) {
            case State.CONNECTING:
                setStatus('Connecting...', '');
                connectingScreen.classList.remove('hidden');
                break;

            case State.CAMERA_INIT:
                connectingScreen.classList.add('hidden');
                setStatus('Initializing camera...', '');
                break;

            case State.SCANNING:
                setStatus('Place A4 paper in frame', 'active');
                guideLabel.textContent = 'Place A4 paper';
                startDetection();
                break;

            case State.PAPER_FOUND:
                guide.classList.add('detected');
                setStatus('Paper detected — place foot', 'active');
                guideLabel.textContent = 'Place foot on paper';
                break;

            case State.READY:
                guide.classList.add('ready');
                captureBtn.disabled = false;
                captureBtn.classList.add('ready');
                setStatus('Foot detected — tap to capture', 'ready');
                guideLabel.textContent = 'Hold still';
                break;

            case State.CAPTURED:
                stopDetection();
                break;

            case State.PROCESSING:
                processingScreen.classList.add('active');
                setStatus('Processing...', 'active');
                break;

            case State.RESULTS:
                processingScreen.classList.remove('active');
                resultsScreen.classList.add('active');
                statusDot.classList.add('done');
                setStatus('Scan complete', '');
                break;

            case State.SENT:
                resultsScreen.classList.remove('active');
                sentScreen.classList.add('active');
                statusDot.classList.add('done');
                setStatus('Signal transmitted', '');
                break;
        }
    }

    function setStatus(text, dotClass) {
        statusText.textContent = text;
        if (dotClass) {
            statusDot.classList.add(dotClass);
            statusText.classList.add('active');
        }
    }

    /* ============================================
       CONNECTION (PeerJS or BroadcastChannel)
       ============================================ */

    function initConnection() {
        if (isDirect) {
            // Same-device mode via BroadcastChannel
            bc = new BroadcastChannel('axon-scanner');
            sessionId.textContent = 'DIRECT';
            setState(State.CAMERA_INIT);
            initCamera();
            return;
        }

        if (!peerId) {
            // No peer ID — standalone mode
            sessionId.textContent = 'STANDALONE';
            setState(State.CAMERA_INIT);
            initCamera();
            return;
        }

        sessionId.textContent = peerId.slice(-6).toUpperCase();

        // Connect to desktop peer
        peer = new Peer();
        peer.on('open', () => {
            conn = peer.connect(peerId, { reliable: true });
            conn.on('open', () => {
                setState(State.CAMERA_INIT);
                initCamera();
            });
            conn.on('error', err => showError('Connection lost'));
        });
        peer.on('error', err => {
            showError('Could not connect');
            // Fall back to standalone
            setTimeout(() => {
                setState(State.CAMERA_INIT);
                initCamera();
            }, 1500);
        });
    }

    /* ============================================
       CAMERA
       ============================================ */

    async function initCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            });
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => {
                processCanvas.width = video.videoWidth;
                processCanvas.height = video.videoHeight;
                setState(State.SCANNING);
            });
        } catch (err) {
            showError('Camera access denied');
            // Try front camera as fallback
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
                    audio: false
                });
                video.srcObject = stream;
                video.addEventListener('loadedmetadata', () => {
                    processCanvas.width = video.videoWidth;
                    processCanvas.height = video.videoHeight;
                    setState(State.SCANNING);
                });
            } catch (e2) {
                showError('No camera available');
            }
        }
    }

    /* ============================================
       A4 DETECTION + FOOT MEASUREMENT
       ============================================ */

    function startDetection() {
        paperStableCount = 0;
        footDetectedCount = 0;
        detectionLoop = setInterval(detectFrame, SAMPLE_INTERVAL);
    }

    function stopDetection() {
        if (detectionLoop) {
            clearInterval(detectionLoop);
            detectionLoop = null;
        }
    }

    function detectFrame() {
        if (state !== State.SCANNING && state !== State.PAPER_FOUND && state !== State.READY) return;
        if (!video.videoWidth) return;

        // Draw current frame to offscreen canvas
        ctx.drawImage(video, 0, 0, processCanvas.width, processCanvas.height);

        // Sample center region for paper detection
        const cw = processCanvas.width;
        const ch = processCanvas.height;

        // Guide bounds (matching CSS: 55vw centered, A4 aspect)
        const guideW = cw * 0.55;
        const guideH = guideW * A4_RATIO;
        const gx = (cw - guideW) / 2;
        const gy = (ch - guideH) / 2;

        // Get pixels within guide area (sample every 4th pixel for speed)
        const imageData = ctx.getImageData(
            Math.floor(gx), Math.floor(gy),
            Math.floor(guideW), Math.floor(guideH)
        );
        const data = imageData.data;
        const totalPixels = Math.floor(guideW) * Math.floor(guideH);
        const step = 4; // sample every 4th pixel

        let whiteCount = 0;
        let darkPixels = [];
        let darkMinX = Infinity, darkMaxX = 0, darkMinY = Infinity, darkMaxY = 0;
        let darkCount = 0;

        const w = Math.floor(guideW);
        const h = Math.floor(guideH);

        for (let y = 0; y < h; y += step) {
            for (let x = 0; x < w; x += step) {
                const i = (y * w + x) * 4;
                const r = data[i], g = data[i + 1], b = data[i + 2];

                if (r > WHITE_THRESH && g > WHITE_THRESH && b > WHITE_THRESH) {
                    whiteCount++;
                } else if (r < FOOT_DARK_THRESH && g < FOOT_DARK_THRESH && b < FOOT_DARK_THRESH) {
                    darkCount++;
                    if (x < darkMinX) darkMinX = x;
                    if (x > darkMaxX) darkMaxX = x;
                    if (y < darkMinY) darkMinY = y;
                    if (y > darkMaxY) darkMaxY = y;
                }
            }
        }

        const sampledPixels = Math.ceil(h / step) * Math.ceil(w / step);
        const whiteRatio = whiteCount / sampledPixels;
        const darkRatio = darkCount / sampledPixels;

        // Paper detection: >40% white in guide area
        if (whiteRatio > 0.40) {
            paperStableCount++;
            if (paperStableCount >= STABLE_FRAMES && state === State.SCANNING) {
                setState(State.PAPER_FOUND);
            }

            // Foot detection: significant dark region within paper area
            if (state === State.PAPER_FOUND || state === State.READY) {
                if (darkRatio > 0.05 && darkCount > 50) {
                    // Calculate foot dimensions using A4 as scale reference
                    const paperWidthPx = w;
                    const pxPerMm = paperWidthPx / A4_WIDTH_MM;

                    const footLengthPx = darkMaxY - darkMinY;
                    const footWidthPx = darkMaxX - darkMinX;

                    const footLengthMm = Math.round(footLengthPx / pxPerMm);
                    const footWidthMm = Math.round(footWidthPx / pxPerMm);

                    // Sanity check: foot should be 200-330mm long, 70-130mm wide
                    if (footLengthMm >= 180 && footLengthMm <= 340 &&
                        footWidthMm >= 60 && footWidthMm <= 140) {

                        footDetectedCount++;

                        // Estimate arch height from medial contour
                        const archHeight = estimateArchHeight(data, w, h, step, darkMinX, darkMaxX, darkMinY, darkMaxY);

                        // Estimate toe splay
                        const toeSplay = estimateToeSplay(data, w, h, step, darkMinX, darkMaxX, darkMinY, darkMaxY);

                        lastMeasurement = {
                            footLength: clamp(footLengthMm, 220, 310),
                            footWidth: clamp(footWidthMm, 80, 120),
                            archHeight: archHeight,
                            toeSplay: toeSplay,
                            rawLength: footLengthMm,
                            rawWidth: footWidthMm
                        };

                        if (footDetectedCount >= 3 && state !== State.READY) {
                            setState(State.READY);
                        }
                    } else {
                        footDetectedCount = Math.max(0, footDetectedCount - 1);
                        if (state === State.READY && footDetectedCount < 2) {
                            setState(State.PAPER_FOUND);
                        }
                    }
                } else {
                    footDetectedCount = Math.max(0, footDetectedCount - 1);
                    if (state === State.READY && footDetectedCount < 2) {
                        setState(State.PAPER_FOUND);
                    }
                }
            }
        } else {
            paperStableCount = Math.max(0, paperStableCount - 2);
            if (paperStableCount < 2 && (state === State.PAPER_FOUND || state === State.READY)) {
                footDetectedCount = 0;
                setState(State.SCANNING);
            }
        }
    }

    function estimateArchHeight(data, w, h, step, minX, maxX, minY, maxY) {
        // Sample medial contour width at 55% from heel vs ball width
        const footHeight = maxY - minY;
        const midY = minY + Math.round(footHeight * 0.55);
        const ballY = minY + Math.round(footHeight * 0.25);

        let midWidth = 0, ballWidth = 0;

        // Count dark pixels at midfoot level
        for (let x = minX; x <= maxX; x += step) {
            const i = (midY * w + x) * 4;
            if (data[i] < FOOT_DARK_THRESH && data[i + 1] < FOOT_DARK_THRESH && data[i + 2] < FOOT_DARK_THRESH) {
                midWidth++;
            }
        }

        // Count dark pixels at ball level
        for (let x = minX; x <= maxX; x += step) {
            const i = (ballY * w + x) * 4;
            if (data[i] < FOOT_DARK_THRESH && data[i + 1] < FOOT_DARK_THRESH && data[i + 2] < FOOT_DARK_THRESH) {
                ballWidth++;
            }
        }

        if (ballWidth === 0) return 'medium';
        const ratio = midWidth / ballWidth;

        if (ratio < 0.45) return 'high';
        if (ratio > 0.70) return 'low';
        return 'medium';
    }

    function estimateToeSplay(data, w, h, step, minX, maxX, minY, maxY) {
        const footHeight = maxY - minY;
        const toeY = minY + Math.round(footHeight * 0.08);
        const midY = minY + Math.round(footHeight * 0.50);

        let toeWidth = 0, midWidth = 0;

        for (let x = minX; x <= maxX; x += step) {
            const i = (toeY * w + x) * 4;
            if (data[i] < FOOT_DARK_THRESH && data[i + 1] < FOOT_DARK_THRESH && data[i + 2] < FOOT_DARK_THRESH) {
                toeWidth++;
            }
        }

        for (let x = minX; x <= maxX; x += step) {
            const i = (midY * w + x) * 4;
            if (data[i] < FOOT_DARK_THRESH && data[i + 1] < FOOT_DARK_THRESH && data[i + 2] < FOOT_DARK_THRESH) {
                midWidth++;
            }
        }

        if (midWidth === 0) return 'normal';
        const ratio = toeWidth / midWidth;

        if (ratio > 1.1) return 'wide';
        if (ratio < 0.7) return 'narrow';
        return 'normal';
    }

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    /* ============================================
       CAPTURE + PROCESS
       ============================================ */

    function capture() {
        if (state !== State.READY || !lastMeasurement) return;

        setState(State.CAPTURED);

        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(50);

        setState(State.PROCESSING);

        // Simulate processing time (min 1.5s for UX)
        setTimeout(() => {
            showResults(lastMeasurement);
        }, PROCESS_DELAY);
    }

    function showResults(m) {
        resultsData.innerHTML = '';

        const rows = [
            { label: 'Length', value: `${m.footLength} mm` },
            { label: 'Width', value: `${m.footWidth} mm` },
            { label: 'Arch', value: m.archHeight.charAt(0).toUpperCase() + m.archHeight.slice(1) },
            { label: 'Toe splay', value: m.toeSplay.charAt(0).toUpperCase() + m.toeSplay.slice(1) }
        ];

        rows.forEach(row => {
            const div = document.createElement('div');
            div.className = 'sc-data-row';
            div.innerHTML = `<span class="sc-data-label">${row.label}</span><span class="sc-data-value">${row.value}</span>`;
            resultsData.appendChild(div);
        });

        setState(State.RESULTS);
    }

    /* ============================================
       SEND DATA
       ============================================ */

    function sendData() {
        if (!lastMeasurement) return;

        const payload = {
            type: 'axon-scan-result',
            footLength: lastMeasurement.footLength,
            footWidth: lastMeasurement.footWidth,
            archHeight: lastMeasurement.archHeight,
            toeSplay: lastMeasurement.toeSplay,
            timestamp: Date.now()
        };

        // Send via PeerJS data channel
        if (conn && conn.open) {
            conn.send(payload);
        }

        // Send via BroadcastChannel (direct mode)
        if (bc) {
            bc.postMessage(payload);
        }

        // Haptic
        if (navigator.vibrate) navigator.vibrate([30, 50, 30]);

        setState(State.SENT);
    }

    function rescan() {
        resultsScreen.classList.remove('active');
        processingScreen.classList.remove('active');
        sentScreen.classList.remove('active');
        lastMeasurement = null;
        footDetectedCount = 0;
        paperStableCount = 0;
        setState(State.SCANNING);
    }

    /* ============================================
       ERROR
       ============================================ */

    let errorTimer = null;
    function showError(msg) {
        errorToast.textContent = msg;
        errorToast.classList.add('active');
        if (errorTimer) clearTimeout(errorTimer);
        errorTimer = setTimeout(() => errorToast.classList.remove('active'), 3000);
    }

    /* ============================================
       EVENT BINDINGS
       ============================================ */

    captureBtn.addEventListener('click', capture);
    sendBtn.addEventListener('click', sendData);
    rescanBtn.addEventListener('click', rescan);

    /* ============================================
       INIT
       ============================================ */

    initConnection();

})();
