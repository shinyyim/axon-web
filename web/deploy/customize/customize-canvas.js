/* ============================================
   AXON. — Customize Canvas Visualizations
   Stage 2 data panels + Stage 3 computation theater
   ============================================ */

const SIGNAL = '#E94520';
const BONE   = '#E8E0D4';
const DUST   = '#8B7D6B';
const VOID   = '#0A0A0C';
const HAZE   = '#2A2A30';

function initCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
}

/* ---- Stage 1: Foot Silhouette (fallback 2D) ---- */
export function drawFootSilhouette(canvas, profile) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const scale = Math.min(w, h) * 0.35;
    const lenN = profile.geometry.footLength / 265;
    const widN = profile.geometry.footWidth / 100;

    // Foot outline
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2);

    ctx.beginPath();
    const pts = footOutlinePoints(lenN, widN);
    ctx.moveTo(pts[0][0] * scale, pts[0][1] * scale);
    for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0] * scale, pts[i][1] * scale);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(233,69,32,0.06)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(233,69,32,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pressure dots
    const archMap = { low: 0.7, medium: 1.0, high: 1.3 };
    const archF = archMap[profile.geometry.archHeight] || 1;
    const pressurePts = [
        { x: -0.35 * lenN, y: 0, r: 0.08, label: 'HEEL' },
        { x: 0, y: 0.05 * archF, r: 0.06, label: 'ARCH' },
        { x: 0.25 * lenN, y: 0, r: 0.07, label: 'BALL' },
        { x: 0.42 * lenN, y: 0.05, r: 0.04, label: 'TOE' }
    ];
    pressurePts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x * scale, p.y * scale, p.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(233,69,32,0.15)';
        ctx.fill();
        ctx.fillStyle = 'rgba(233,69,32,0.5)';
        ctx.font = `${Math.max(7, scale * 0.04)}px 'IBM Plex Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.x * scale, p.y * scale + p.r * scale + 12);
    });

    ctx.restore();
}

function footOutlinePoints(lenN, widN) {
    const pts = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = t * Math.PI * 2;
        let r;
        if (angle < Math.PI) {
            // Medial side (inside)
            const base = 0.3 + 0.15 * Math.sin(angle * 1.2);
            r = base * widN * 0.5 + (angle > 1 && angle < 2.2 ? 0.05 : 0);
        } else {
            // Lateral side
            const base = 0.3 + 0.12 * Math.sin((angle - Math.PI) * 1.1);
            r = base * widN * 0.5;
        }
        const x = Math.cos(angle) * lenN * 0.5;
        const y = Math.sin(angle) * r;
        pts.push([x, y]);
    }
    return pts;
}

/* ---- Stage 2: Pressure Heatmap ---- */
export function drawPressureHeatmap(canvas, pressureMap) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, w, h);

    const zones = pressureMap.zones;
    const maxForce = Math.max(...zones.map(z => z.forceN));

    // Foot outline
    ctx.save();
    ctx.translate(w * 0.5, h * 0.5);
    ctx.scale(0.8, 0.8);

    // Pressure blobs
    zones.forEach(z => {
        const intensity = z.forceN / maxForce;
        const radius = 30 + intensity * 60;
        const grd = ctx.createRadialGradient(
            (z.x - 0.5) * w, (z.y - 0.5) * h, 0,
            (z.x - 0.5) * w, (z.y - 0.5) * h, radius
        );
        const alpha = 0.2 + intensity * 0.5;
        grd.addColorStop(0, `rgba(233,69,32,${alpha})`);
        grd.addColorStop(0.6, `rgba(233,69,32,${alpha * 0.3})`);
        grd.addColorStop(1, 'rgba(233,69,32,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(-w / 2, -h / 2, w, h);
    });

    // Grid overlay
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = -w / 2; x < w / 2; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, -h / 2); ctx.lineTo(x, h / 2); ctx.stroke();
    }
    for (let y = -h / 2; y < h / 2; y += 20) {
        ctx.beginPath(); ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y); ctx.stroke();
    }

    // Zone labels
    ctx.font = "9px 'IBM Plex Mono', monospace";
    ctx.textAlign = 'center';
    zones.forEach(z => {
        const px = (z.x - 0.5) * w;
        const py = (z.y - 0.5) * h;
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText(`${z.forceN}N`, px, py + 4);
    });

    ctx.restore();
}

/* ---- Stage 2: Force Distribution ---- */
export function drawForceDistribution(canvas, pressureMap) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, w, h);

    const dist = pressureMap.strikeDist;
    const bars = [
        { label: 'HEEL', val: dist.heel },
        { label: 'MID', val: dist.midfoot },
        { label: 'FORE', val: dist.forefoot }
    ];
    const barW = w * 0.2;
    const maxH = h * 0.55;
    const gap = (w - bars.length * barW) / (bars.length + 1);

    bars.forEach((b, i) => {
        const x = gap + i * (barW + gap);
        const barH = b.val * maxH;
        const y = h * 0.7 - barH;

        // Bar
        ctx.fillStyle = b.val === Math.max(...bars.map(b => b.val)) ? SIGNAL : HAZE;
        ctx.fillRect(x, y, barW, barH);

        // Label
        ctx.fillStyle = DUST;
        ctx.font = "9px 'IBM Plex Mono', monospace";
        ctx.textAlign = 'center';
        ctx.fillText(b.label, x + barW / 2, h * 0.7 + 16);

        // Percentage
        ctx.fillStyle = BONE;
        ctx.font = "14px 'IBM Plex Mono', monospace";
        ctx.fillText(`${Math.round(b.val * 100)}%`, x + barW / 2, y - 8);
    });
}

/* ---- Stage 2: Lattice Density ---- */
export function drawLatticeDensity(canvas, lattice) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, w, h);

    const cols = 16, rows = 12;
    const cellW = w / cols, cellH = h / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cx = c * cellW + cellW / 2;
            const cy = r * cellH + cellH / 2;
            // Density varies based on position (center = denser)
            const distFromCenter = Math.sqrt(
                Math.pow((c / cols - 0.5) * 2, 2) +
                Math.pow((r / rows - 0.5) * 2, 2)
            );
            const density = Math.max(0.1, 1 - distFromCenter * 0.8);
            const radius = (cellW * 0.3) * density;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(233,69,32,${0.15 + density * 0.4})`;
            ctx.lineWidth = 0.5 + density;
            ctx.stroke();

            // Connect to neighbors
            if (c < cols - 1) {
                ctx.beginPath();
                ctx.moveTo(cx + radius, cy);
                ctx.lineTo(cx + cellW - radius, cy);
                ctx.strokeStyle = `rgba(255,255,255,${0.03 + density * 0.05})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    // Stats
    ctx.fillStyle = DUST;
    ctx.font = "10px 'IBM Plex Mono', monospace";
    ctx.textAlign = 'left';
    ctx.fillText(`CELLS: ${lattice.totalCells.toLocaleString()}`, 12, h - 12);
}

/* ---- Stage 2: Body Signal ---- */
export function drawBodySignal(canvas, bodySignal) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, w, h);

    const midY = h / 2;
    const amp = h * 0.25;
    const freq = bodySignal.cadence / 40;

    // Signal wave
    ctx.beginPath();
    ctx.moveTo(0, midY);
    for (let x = 0; x < w; x++) {
        const t = x / w;
        const y = midY + Math.sin(t * freq * Math.PI) * amp *
            (1 + 0.3 * Math.sin(t * freq * 3)) *
            Math.exp(-Math.pow(t - 0.5, 2) * 4);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = SIGNAL;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(w, midY);
    ctx.lineTo(0, midY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(233,69,32,0.05)';
    ctx.fill();

    // Zero line
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Labels
    ctx.fillStyle = DUST;
    ctx.font = "9px 'IBM Plex Mono', monospace";
    ctx.textAlign = 'right';
    ctx.fillText(`${bodySignal.cadence} SPM`, w - 12, 20);
    ctx.fillText(bodySignal.complexity.toUpperCase(), w - 12, 34);
}

/* ---- Stage 3: Computation Theater ---- */
export function drawComputationTheater(canvas, spec, progress) {
    const { ctx, w, h } = initCanvas(canvas);
    ctx.fillStyle = VOID;
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const maxR = Math.min(w, h) * 0.38;
    const time = performance.now() / 1000;

    // Rotating lattice grid
    const gridSize = 8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(time * 0.2 * progress);

    for (let i = -gridSize; i <= gridSize; i++) {
        for (let j = -gridSize; j <= gridSize; j++) {
            const dist = Math.sqrt(i * i + j * j) / gridSize;
            if (dist > 1) continue;
            const reveal = (progress - dist * 0.4) / 0.3;
            if (reveal <= 0) continue;

            const alpha = Math.min(1, reveal) * (1 - dist * 0.5);
            const spacing = maxR / gridSize;
            const px = i * spacing;
            const py = j * spacing;
            const r = spacing * 0.2 * (0.5 + dist * 0.5);

            // Hexagonal cell
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
                const angle = a * Math.PI / 3;
                const hx = px + r * Math.cos(angle);
                const hy = py + r * Math.sin(angle);
                a === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(233,69,32,${alpha * 0.4})`;
            ctx.lineWidth = 0.5 + alpha;
            ctx.stroke();
        }
    }
    ctx.restore();

    // Progress ring
    ctx.beginPath();
    ctx.arc(cx, cy, maxR + 20, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2);
    ctx.strokeStyle = SIGNAL;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center percentage
    ctx.fillStyle = BONE;
    ctx.font = `bold ${Math.min(48, w * 0.08)}px 'Oswald', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(progress * 100)}%`, cx, cy);
}
