/* ============================================
   AXON. — Scanner Modal (Desktop)
   Phone-as-scanner via PeerJS WebRTC
   ============================================ */

export class ScannerModal {
    constructor(onData) {
        this.onData = onData;       // callback(scanData)
        this.peer = null;
        this.conn = null;
        this.bc = null;             // BroadcastChannel for direct mode
        this.popup = null;
        this.el = null;             // modal root
        this.peerId = null;
        this._libs = { peer: false, qr: false };
        this._destroyed = false;
    }

    /* ============================================
       PUBLIC API
       ============================================ */

    async open() {
        this._buildDOM();
        document.body.appendChild(this.el);

        // Trigger entrance
        requestAnimationFrame(() => {
            this.el.classList.add('open');
        });

        this._setStatus('Loading scanner...');

        try {
            await this._loadLibs();
            this._initPeer();
        } catch (err) {
            this._setStatus('Failed to load scanner');
        }
    }

    close() {
        if (this._destroyed) return;
        this._destroyed = true;

        // Clean up
        if (this.peer) { this.peer.destroy(); this.peer = null; }
        if (this.bc) { this.bc.close(); this.bc = null; }
        if (this.popup && !this.popup.closed) { this.popup.close(); }

        if (this.el) {
            this.el.classList.remove('open');
            setTimeout(() => this.el.remove(), 300);
        }
    }

    /* ============================================
       DOM CONSTRUCTION
       ============================================ */

    _buildDOM() {
        const modal = document.createElement('div');
        modal.className = 'scanner-modal';
        modal.innerHTML = `
            <div class="sm-backdrop"></div>
            <div class="sm-card">
                <button class="sm-close">&times;</button>

                <div class="sm-header">
                    <div class="sm-eye">AXON. SCAN</div>
                    <h3 class="sm-title">Connect Scanner</h3>
                    <p class="sm-desc">Scan the QR code with your phone to use it as a foot scanner.</p>
                </div>

                <!-- QR Section -->
                <div class="sm-qr-section" id="sm-qr-section">
                    <canvas id="sm-qr-canvas" width="180" height="180"></canvas>
                    <div class="sm-code" id="sm-session-code">------</div>
                    <div class="sm-status" id="sm-status">
                        <span class="sm-status-dot"></span>
                        <span class="sm-status-text">Initializing...</span>
                    </div>
                </div>

                <!-- Received data (hidden until scan arrives) -->
                <div class="sm-received" id="sm-received" style="display:none">
                    <div class="sm-recv-title">Signal captured.</div>
                    <div class="sm-recv-data" id="sm-recv-data"></div>
                    <button class="sm-apply" id="sm-apply-btn">Apply to profile</button>
                </div>

                <!-- Direct camera option -->
                <div class="sm-divider"><span>or</span></div>
                <button class="sm-direct" id="sm-direct-btn">
                    Use this device's camera
                </button>
            </div>
        `;

        this.el = modal;

        // Bind events
        modal.querySelector('.sm-backdrop').addEventListener('click', () => this.close());
        modal.querySelector('.sm-close').addEventListener('click', () => this.close());
        modal.querySelector('#sm-apply-btn').addEventListener('click', () => this._applyData());
        modal.querySelector('#sm-direct-btn').addEventListener('click', () => this._openDirect());

        // Esc key
        this._escHandler = e => { if (e.key === 'Escape') this.close(); };
        document.addEventListener('keydown', this._escHandler);
    }

    /* ============================================
       LAZY LIBRARY LOADING
       ============================================ */

    _loadLibs() {
        return Promise.all([
            this._loadScript('https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js', 'peer'),
            this._loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js', 'qr')
                .catch(() => this._loadScript('https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js', 'qr'))
        ]);
    }

    _loadScript(url, key) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (key === 'peer' && window.Peer) { this._libs[key] = true; return resolve(); }
            if (key === 'qr' && window.QRCode) { this._libs[key] = true; return resolve(); }

            const s = document.createElement('script');
            s.src = url;
            s.onload = () => { this._libs[key] = true; resolve(); };
            s.onerror = () => reject(new Error(`Failed to load ${key}`));
            document.head.appendChild(s);
        });
    }

    /* ============================================
       PEERJS SETUP
       ============================================ */

    _initPeer() {
        if (this._destroyed) return;

        this.peer = new Peer();

        this.peer.on('open', (id) => {
            this.peerId = id;
            this._showQR(id);
            this._setStatus('Waiting for phone...');

            // Display session code
            const codeEl = this.el.querySelector('#sm-session-code');
            if (codeEl) codeEl.textContent = id.slice(-6).toUpperCase();
        });

        this.peer.on('connection', (conn) => {
            this.conn = conn;
            this._setStatus('Phone connected', 'connected');

            conn.on('data', (data) => {
                if (data && data.type === 'axon-scan-result') {
                    this._onScanData(data);
                }
            });

            conn.on('close', () => {
                this._setStatus('Phone disconnected', 'disconnected');
            });
        });

        this.peer.on('error', (err) => {
            console.warn('PeerJS error:', err);
            this._setStatus('Connection error — use direct mode');
        });
    }

    /* ============================================
       QR CODE
       ============================================ */

    async _showQR(peerId) {
        if (this._destroyed) return;

        const canvas = this.el.querySelector('#sm-qr-canvas');

        // Build scanner URL — use current origin
        const scanUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}scanner/scan.html?p=${peerId}`;

        // Try QRCode library
        if (canvas && window.QRCode) {
            try {
                await QRCode.toCanvas(canvas, scanUrl, {
                    width: 180,
                    margin: 2,
                    color: {
                        dark: '#E8E0D4',
                        light: '#0A0A0C'
                    },
                    errorCorrectionLevel: 'M'
                });
                return;
            } catch (err) {
                console.warn('QRCode.toCanvas failed:', err);
            }
        }

        // Fallback: show URL as text + use QR API image
        const section = this.el.querySelector('#sm-qr-section');
        if (section) {
            const fallback = document.createElement('div');
            fallback.style.cssText = 'text-align:center;padding:8px 0';
            const img = document.createElement('img');
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(scanUrl)}&bgcolor=0A0A0C&color=E8E0D4`;
            img.width = 180;
            img.height = 180;
            img.style.borderRadius = '8px';
            img.alt = 'QR Code';
            fallback.appendChild(img);
            // Replace canvas with image
            if (canvas) canvas.replaceWith(fallback);
        }
    }

    /* ============================================
       DIRECT CAMERA MODE
       ============================================ */

    _openDirect() {
        // Setup BroadcastChannel
        this.bc = new BroadcastChannel('axon-scanner');
        this.bc.onmessage = (e) => {
            if (e.data && e.data.type === 'axon-scan-result') {
                this._onScanData(e.data);
            }
        };

        // Open scan.html in a popup
        const scanUrl = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}scanner/scan.html?direct=true`;
        this.popup = window.open(scanUrl, 'axon-scanner', 'width=420,height=720,menubar=no,toolbar=no');

        this._setStatus('Direct camera active', 'connected');

        // Poll for popup close
        const check = setInterval(() => {
            if (this.popup && this.popup.closed) {
                clearInterval(check);
                if (this.bc) { this.bc.close(); this.bc = null; }
                this._setStatus('Camera closed');
            }
        }, 500);
    }

    /* ============================================
       DATA RECEIVED
       ============================================ */

    _onScanData(data) {
        this._scanData = data;

        // Hide QR section, show received data
        const qrSection = this.el.querySelector('#sm-qr-section');
        const recvSection = this.el.querySelector('#sm-received');
        const directBtn = this.el.querySelector('#sm-direct-btn');
        const divider = this.el.querySelector('.sm-divider');

        if (qrSection) qrSection.style.display = 'none';
        if (directBtn) directBtn.style.display = 'none';
        if (divider) divider.style.display = 'none';
        if (recvSection) {
            recvSection.style.display = 'block';
            const dataEl = this.el.querySelector('#sm-recv-data');
            if (dataEl) {
                dataEl.innerHTML = `
                    <div class="sm-data-row"><span>Length</span><span>${data.footLength} mm</span></div>
                    <div class="sm-data-row"><span>Width</span><span>${data.footWidth} mm</span></div>
                    <div class="sm-data-row"><span>Arch</span><span>${data.archHeight}</span></div>
                    <div class="sm-data-row"><span>Toe splay</span><span>${data.toeSplay}</span></div>
                `;
            }
        }

        this._setStatus('Signal captured', 'done');
    }

    _applyData() {
        if (this._scanData && this.onData) {
            this.onData(this._scanData);
        }
        this.close();
    }

    /* ============================================
       STATUS
       ============================================ */

    _setStatus(text, state) {
        const statusEl = this.el?.querySelector('#sm-status');
        if (!statusEl) return;

        const dot = statusEl.querySelector('.sm-status-dot');
        const txt = statusEl.querySelector('.sm-status-text');

        if (txt) txt.textContent = text;
        if (dot) {
            dot.className = 'sm-status-dot';
            if (state === 'connected') dot.classList.add('connected');
            if (state === 'done') dot.classList.add('done');
            if (state === 'disconnected') dot.classList.add('disconnected');
        }
    }

    /* ============================================
       CLEANUP
       ============================================ */

    destroy() {
        this.close();
        if (this._escHandler) {
            document.removeEventListener('keydown', this._escHandler);
        }
    }
}
