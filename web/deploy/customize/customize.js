/* ============================================
   AXON. — Customize Controller
   Body → Data → Pattern → Form
   ============================================ */

import {
    createDefaultProfile, computeFullSpec,
    isProfileComplete, INPUT_RANGES, onScannerData
} from './customize-data.js';

import {
    drawFootSilhouette, drawPressureHeatmap,
    drawForceDistribution, drawLatticeDensity,
    drawBodySignal, drawComputationTheater
} from './customize-canvas.js';

import { FootViewer, ShoeViewer } from './customize-3d.js';
import { ScannerModal } from './scanner/customize-scanner.js';
import { uploadImage, listImages } from './supabase-config.js';

/* ---- State ---- */
let currentStage = 1;
let profile = createDefaultProfile();
let spec = null;
let footViewer = null;
let shoeViewer = null;
let computationTimer = null;

/* ---- DOM ---- */
const stages = {
    1: document.getElementById('s1'),
    2: document.getElementById('s2'),
    3: document.getElementById('s3'),
    4: document.getElementById('s4'),
    5: document.getElementById('s5')
};
const tabs = document.querySelectorAll('.stab');

/* ============================================
   STAGE NAVIGATION
   ============================================ */

function goToStage(n) {
    if (n === currentStage || n < 1 || n > 4) return;
    navMode = 'customize';
    currentStage = n;

    // Swap stages
    Object.values(stages).forEach(el => el && el.classList.remove('active'));
    if (stages[n]) stages[n].classList.add('active');

    // Update tabs
    tabs.forEach((tab, i) => {
        tab.classList.remove('active', 'done');
        if (i + 1 === n) tab.classList.add('active');
        else if (i + 1 < n) tab.classList.add('done');
    });

    window.scrollTo(0, 0);

    // Init
    if (n === 1) initStage1();
    if (n === 2) initStage2();
    if (n === 3) initStage3();
    if (n === 4) initStage4();

    // Trigger fade-ins
    setTimeout(() => {
        stages[n]?.querySelectorAll('.fi').forEach(el => el.classList.add('vis'));
    }, 100);
}

/* ============================================
   STAGE 1: BODY
   ============================================ */

function initStage1() {
    updateFootCanvas();
    updateCTA();
}

function bindInputs() {
    // Sliders
    bindSlider('foot-length', 'foot-length-val', INPUT_RANGES.footLength,
        v => { profile.geometry.footLength = v; });
    bindSlider('foot-width', 'foot-width-val', INPUT_RANGES.footWidth,
        v => { profile.geometry.footWidth = v; });
    bindSlider('cadence', 'cadence-val', INPUT_RANGES.cadence,
        v => { profile.biomechanics.cadence = v; updatePulse(v); });
    bindSlider('body-weight', 'body-weight-val', INPUT_RANGES.bodyWeight,
        v => { profile.load.bodyWeight = v; });

    // Selectors
    bindSelector('arch-height', v => { profile.geometry.archHeight = v; });
    bindSelector('strike-pattern', v => { profile.biomechanics.strikePattern = v; });
    bindSelector('pronation', v => { profile.biomechanics.pronationType = v; });
    bindSelector('activity', v => { profile.load.activityType = v; });
    bindSelector('ankle-flex', v => { profile.biomechanics.ankleFlexibility = v; });
    bindSelector('toe-splay', v => { profile.geometry.toeSplay = v; });
    bindSelector('cushion-pref', v => { profile.load.cushionPref = v; });

    // Extended toggle
    const extTog = document.getElementById('extend-toggle');
    const extWrap = document.getElementById('extended-inputs');
    if (extTog && extWrap) {
        extTog.addEventListener('click', () => {
            extWrap.classList.toggle('open');
            extTog.classList.toggle('open');
        });
    }

    // Begin computation CTA
    document.getElementById('begin-computation')?.addEventListener('click', () => {
        if (isProfileComplete(profile)) {
            spec = computeFullSpec(profile);
            goToStage(2);
        }
    });
}

function bindSlider(id, valId, range, onChange) {
    const sl = document.getElementById(id);
    const vl = document.getElementById(valId);
    if (!sl) return;
    sl.min = range.min;
    sl.max = range.max;
    sl.value = range.default;
    if (vl) vl.textContent = `${range.default} ${range.unit || ''}`;
    sl.addEventListener('input', () => {
        const v = parseInt(sl.value);
        if (vl) vl.textContent = `${v} ${range.unit || ''}`;
        onChange(v);
        updateFootCanvas();
        updateCTA();
    });
}

function bindSelector(groupId, onChange) {
    const el = document.getElementById(groupId);
    if (!el) return;
    el.querySelectorAll('.isel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            el.querySelectorAll('.isel-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onChange(btn.dataset.value);
            updateFootCanvas();
            updateCTA();
        });
    });
}

function updateFootCanvas() {
    if (!footViewer) {
        const container = document.getElementById('foot-viewer');
        if (container) {
            footViewer = new FootViewer(container);
        }
    }
    if (footViewer) footViewer.update(profile);
}

function updateCTA() {
    const btn = document.getElementById('begin-computation');
    if (btn) btn.disabled = !isProfileComplete(profile);
}

function updatePulse(cadence) {
    const dot = document.getElementById('cadence-pulse');
    if (dot) dot.style.setProperty('--ps', Math.round(60000 / cadence) + 'ms');
}

/* ============================================
   STAGE 2: DATA
   ============================================ */

function initStage2() {
    if (!spec) return;

    const panels = [
        { id: 'heatmap-canvas', fn: () => drawPressureHeatmap(document.getElementById('heatmap-canvas'), spec.pressureMap) },
        { id: 'force-canvas', fn: () => drawForceDistribution(document.getElementById('force-canvas'), spec.pressureMap) },
        { id: 'lattice-canvas', fn: () => drawLatticeDensity(document.getElementById('lattice-canvas'), spec.lattice) },
        { id: 'signal-canvas', fn: () => drawBodySignal(document.getElementById('signal-canvas'), spec.bodySignal) }
    ];

    panels.forEach((p, i) => {
        setTimeout(() => { if (document.getElementById(p.id)) p.fn(); }, i * 350);
    });

    // Readouts
    document.querySelectorAll('.s2-rd').forEach((el, i) => {
        const t = el.dataset.text;
        if (t) setTimeout(() => typeText(el, fillTemplate(t)), 500 + i * 400);
    });

    // Continue
    const btn = document.getElementById('data-continue');
    if (btn) {
        const nb = btn.cloneNode(true);
        btn.parentNode.replaceChild(nb, btn);
        nb.addEventListener('click', () => goToStage(3));
    }
}

function fillTemplate(t) {
    if (!spec) return t;
    return t
        .replace('{peakZone}', spec.pressureMap.peakZone.name.toLowerCase())
        .replace('{totalCells}', spec.lattice.totalCells.toLocaleString())
        .replace('{cellMin}', spec.lattice.cellSizeRange.min)
        .replace('{cellMax}', spec.lattice.cellSizeRange.max)
        .replace('{complexity}', spec.bodySignal.complexity)
        .replace('{symmetry}', spec.bodySignal.symmetry)
        .replace('{totalGRF}', spec.pressureMap.totalGRF);
}

/* ============================================
   STAGE 3: PATTERN
   ============================================ */

function initStage3() {
    if (!spec) return;

    const canvas = document.getElementById('computation-canvas');
    const terminal = document.getElementById('computation-terminal');
    const done = document.getElementById('pattern-complete');

    const dur = 13000;
    const start = performance.now();
    let lastLine = -1;

    const lines = [
        { t: .02, text: '> initializing lattice generation...', c: '' },
        { t: .05, text: `  foot: ${spec.profile.geometry.footLength}mm x ${spec.profile.geometry.footWidth}mm`, c: 'tl-dim' },
        { t: .08, text: `  strike: ${spec.profile.biomechanics.strikePattern}`, c: 'tl-dim' },
        { t: .12, text: `  pronation: ${spec.profile.biomechanics.pronationType}`, c: 'tl-dim' },
        { t: .15, text: '> mapping pressure topology to density field...', c: '' },
        { t: .22, text: `  peak: ${spec.pressureMap.peakZone.name.toLowerCase()} (${spec.pressureMap.peakZone.forceN}N)`, c: 'tl-dim' },
        { t: .28, text: '> seeding gyroid cell grid across sole volume', c: '' },
        { t: .35, text: `  target cells: ${spec.lattice.totalCells.toLocaleString()}`, c: 'tl-dim' },
        { t: .40, text: '> running FEA simulation — round 1/8', c: '' },
        { t: .45, text: '> FEA round 2/8 — adjusting wall thickness', c: '' },
        { t: .50, text: '> FEA round 3/8', c: 'tl-dim' },
        { t: .55, text: '> FEA round 4/8 — convergence 94.2%', c: '' },
        { t: .58, text: '> FEA round 5/8', c: 'tl-dim' },
        { t: .61, text: '> FEA round 6/8 — convergence 97.8%', c: '' },
        { t: .64, text: '> FEA round 7/8', c: 'tl-dim' },
        { t: .67, text: '> FEA round 8/8 — convergence 99.4%', c: 'tl-s' },
        { t: .70, text: '> mapping tread nodes to pressure distribution', c: '' },
        { t: .75, text: `  nodes: 30 | depth: ${spec.treadNodes[0].depth} — ${spec.treadNodes[spec.treadNodes.length - 1].depth} mm`, c: 'tl-dim' },
        { t: .80, text: `> stiffness tuning: ${spec.profile.biomechanics.cadence} spm x ${spec.profile.load.bodyWeight} kg`, c: '' },
        { t: .85, text: `  stiffness index: ${spec.lattice.stiffness}`, c: 'tl-dim' },
        { t: .88, text: '> generating upper knit zone map', c: '' },
        { t: .92, text: `  density: ${Math.min(...spec.upper.map(u => u.density))} — ${Math.max(...spec.upper.map(u => u.density))} g/m²`, c: 'tl-dim' },
        { t: .95, text: '> export: lattice.stl — verified', c: 'tl-s' },
        { t: .98, text: '> COMPUTATION COMPLETE.', c: 'tl-ac' }
    ];

    // Reset
    if (terminal) terminal.innerHTML = '';
    if (done) done.classList.remove('vis');

    function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        if (canvas) drawComputationTheater(canvas, spec, p);

        lines.forEach((l, i) => {
            if (p >= l.t && i > lastLine) {
                lastLine = i;
                const div = document.createElement('div');
                div.className = `tl ${l.c}`;
                div.textContent = l.text;
                terminal?.appendChild(div);
                if (terminal) terminal.scrollTop = terminal.scrollHeight;
            }
        });

        if (p < 1) {
            computationTimer = requestAnimationFrame(tick);
        } else if (done) {
            done.classList.add('vis');
        }
    }

    lastLine = -1;
    computationTimer = requestAnimationFrame(tick);

    // Reveal button
    const rb = document.getElementById('reveal-boot');
    if (rb) {
        const nb = rb.cloneNode(true);
        rb.parentNode.replaceChild(nb, rb);
        nb.addEventListener('click', () => {
            if (computationTimer) cancelAnimationFrame(computationTimer);
            goToStage(4);
        });
    }
}

/* ============================================
   STAGE 4: FORM
   ============================================ */

function initStage4() {
    if (!spec) return;

    // 3D Viewer
    const vc = document.getElementById('shoe-viewer');
    const purpose = spec.profile?.load?.activityType || 'training';
    const purposeColorway = { racing: 'signal', longdist: 'glacier', beginner: 'khaki' };
    if (vc && !shoeViewer) {
        shoeViewer = new ShoeViewer(vc);
        if (purposeColorway[purpose]) shoeViewer.setColorway(purposeColorway[purpose]);
        shoeViewer.buildShoe(spec);
    } else if (shoeViewer) {
        if (purposeColorway[purpose]) shoeViewer.setColorway(purposeColorway[purpose]);
        shoeViewer.buildShoe(spec);
    }

    populateSpec();
    populateComparison();

    // Explode toggle
    const ex = document.getElementById('toggle-explode');
    if (ex) {
        const nex = ex.cloneNode(true);
        ex.parentNode.replaceChild(nex, ex);
        nex.addEventListener('click', function () {
            const e = shoeViewer?.toggleExplode();
            this.classList.toggle('active', e);
            this.textContent = e ? 'Assemble' : 'Explode';
        });
    }

    // Wireframe toggle
    const wf = document.getElementById('toggle-wireframe');
    if (wf) {
        const nwf = wf.cloneNode(true);
        wf.parentNode.replaceChild(nwf, wf);
        nwf.addEventListener('click', function () {
            const w = shoeViewer?.toggleWireframe();
            this.classList.toggle('active', w);
            this.textContent = w ? 'Solid' : 'Wireframe';
        });
    }

    // Colorway
    document.querySelectorAll('.cw-sw').forEach(sw => {
        sw.addEventListener('click', () => {
            document.querySelectorAll('.cw-sw').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            shoeViewer?.setColorway(sw.dataset.colorway);
        });
    });

    // Save config
    document.getElementById('save-config')?.addEventListener('click', () => downloadJSON());

    // Reserve scan
    const res = document.getElementById('reserve-scan');
    if (res) {
        const nr = res.cloneNode(true);
        res.parentNode.replaceChild(nr, res);
        nr.addEventListener('click', function () {
            this.textContent = 'Reserved.';
            this.disabled = true;
        });
    }

    // Start over
    const so = document.getElementById('start-over');
    if (so) {
        const nso = so.cloneNode(true);
        so.parentNode.replaceChild(nso, so);
        nso.addEventListener('click', () => {
            profile = createDefaultProfile();
            spec = null;
            if (shoeViewer) { shoeViewer.dispose(); shoeViewer = null; }
            goToStage(1);
        });
    }
}

/* ============================================
   STAGE 5: STRUCTURE (Lattice Density)
   ============================================ */

let ltRaf = null;
let ltState = { purpose: 'training', strike: 'heel', weight: 70, footLength: 265, footWidth: 100 };
let ltAnim = { heel: 1.4, mid: 1.0, fore: 0.8, cells: 2400, wt: 1.0 };

function initStage5() {
    if (!spec) spec = computeFullSpec(profile);

    // Sync from profile
    ltState.purpose = profile.load?.activityType || 'training';
    ltState.strike = profile.biomechanics?.strikePattern || 'heel';
    ltState.weight = profile.load?.bodyWeight || 70;
    ltState.footLength = profile.geometry?.footLength || 265;
    ltState.footWidth = profile.geometry?.footWidth || 100;

    // Sync controls
    document.querySelectorAll('#lt-purpose-sel .sel-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.value === ltState.purpose);
    });
    document.querySelectorAll('#lt-strike-sel .sel-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.value === ltState.strike);
    });
    const ws = document.getElementById('lt-weight-slider');
    const ls = document.getElementById('lt-length-slider');
    const wds = document.getElementById('lt-width-slider');
    if (ws) { ws.value = ltState.weight; document.getElementById('lt-weight-val').textContent = ltState.weight + ' kg'; }
    if (ls) { ls.value = ltState.footLength; document.getElementById('lt-length-val').textContent = ltState.footLength + ' mm'; }
    if (wds) { wds.value = ltState.footWidth; document.getElementById('lt-width-val').textContent = ltState.footWidth + ' mm'; }

    // Bind controls (once)
    if (!initStage5._bound) {
        initStage5._bound = true;
        ltBindSel('lt-purpose-sel', 'purpose');
        ltBindSel('lt-strike-sel', 'strike');
        ltBindSlider('lt-weight-slider', 'lt-weight-val', 'weight', 'kg');
        ltBindSlider('lt-length-slider', 'lt-length-val', 'footLength', 'mm');
        ltBindSlider('lt-width-slider', 'lt-width-val', 'footWidth', 'mm');
    }

    // Start draw loop
    if (ltRaf) cancelAnimationFrame(ltRaf);
    ltDrawLoop();
}

function ltBindSel(id, key) {
    document.getElementById(id)?.querySelectorAll('.sel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(id).querySelectorAll('.sel-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ltState[key] = btn.dataset.value;
        });
    });
}
function ltBindSlider(id, vid, key, u) {
    const s = document.getElementById(id), v = document.getElementById(vid);
    if (s) s.addEventListener('input', () => { ltState[key] = +s.value; v.textContent = s.value + ' ' + u; });
}

function ltCompute() {
    const pc = { beginner: 1800, training: 2400, longdist: 2800, racing: 3200 };
    const lf = ltState.footLength / 265, wf = ltState.footWidth / 100, wt = ltState.weight / 70;
    const cells = Math.round((pc[ltState.purpose] || 2400) * lf * wf * (0.6 + wt * 0.4));
    const ca = { beginner: 0.4, training: 0, longdist: -0.3, racing: -0.6 }[ltState.purpose] || 0;
    const wa = { beginner: -0.05, training: 0, longdist: 0.03, racing: 0.08 }[ltState.purpose] || 0;
    const cellMin = +(2.0 + (1 - wt) * 0.8 + ca).toFixed(1);
    const cellMax = +(4.5 + (1 - wt) * 1.0 + ca).toFixed(1);
    const wallMin = +(0.4 + wt * 0.15 + wa).toFixed(2);
    const wallMax = +(0.8 + wt * 0.2 + wa).toFixed(2);
    const stiff = +(({ beginner: 0.6, training: 0.8, longdist: 0.9, racing: 1.1 }[ltState.purpose] || 0.8) * wt).toFixed(2);
    const weight = Math.round(180 + (cells / 100) * 2 + ltState.weight * 0.8);
    const zd = { heel: { heel: 1.4, mid: 1.0, fore: 0.8 }, midfoot: { heel: 1.0, mid: 1.3, fore: 1.0 }, forefoot: { heel: 0.7, mid: 1.0, fore: 1.5 } }[ltState.strike] || { heel: 1.4, mid: 1.0, fore: 0.8 };
    return { cells, cellMin, cellMax, wallMin, wallMax, stiff, weight, zd, wt };
}

function ltFootOutline(cx, cy, fw, fh) {
    const outline = [[.42,0],[.52,.01],[.60,.03],[.65,.06],[.62,.08],[.68,.09],[.63,.12],[.30,.02],[.22,.04],[.18,.08],[.68,.14],[.72,.18],[.74,.24],[.73,.30],[.70,.38],[.66,.46],[.62,.54],[.60,.62],[.60,.70],[.62,.78],[.62,.85],[.60,.90],[.56,.95],[.50,.98],[.42,1],[.34,.98],[.28,.95],[.24,.90],[.22,.85],[.22,.78],[.24,.70],[.28,.62],[.34,.52],[.38,.44],[.36,.36],[.30,.28],[.24,.22],[.20,.16],[.18,.12],[.20,.08],[.26,.04],[.34,.01],[.42,0]];
    return outline.map(([x, y]) => ({ x: cx + (x - 0.45) * fw, y: cy - fh / 2 + y * fh }));
}

function ltSmoothPath(ctx, pts) {
    if (pts.length < 3) return;
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length - 1; i++) {
        const nx = (pts[i].x + pts[(i+1)%pts.length].x)/2, ny = (pts[i].y + pts[(i+1)%pts.length].y)/2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, nx, ny);
    }
    ctx.closePath();
}

function ltIsInside(px, py, pts) {
    let ins = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
        if ((yi > py) !== (yj > py) && px < (xj-xi)*(py-yi)/(yj-yi)+xi) ins = !ins;
    }
    return ins;
}

function ltDensityColor(d) {
    const t = Math.max(0, Math.min(1, (d - 0.7) / 0.8));
    if (t > 0.65) return { r: 233, g: Math.round(69+(1-t)*100), b: Math.round(32+(1-t)*40), a: 0.6+t*0.4 };
    if (t > 0.3) return { r: Math.round(180+t*60), g: Math.round(100+t*60), b: Math.round(40+t*20), a: 0.4+t*0.4 };
    return { r: Math.round(42+t*60), g: Math.round(42+t*60), b: Math.round(48+t*80), a: 0.3+t*0.3 };
}

function ltLerp(a, b, t) { return a + (b - a) * t; }

function ltDrawLoop() {
    const canvas = document.getElementById('lt-canvas');
    if (!canvas || navMode !== 'structure') { ltRaf = null; return; }
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    ctx.clearRect(0, 0, W, H);

    const data = ltCompute();
    ltAnim.heel = ltLerp(ltAnim.heel, data.zd.heel, 0.07);
    ltAnim.mid = ltLerp(ltAnim.mid, data.zd.mid, 0.07);
    ltAnim.fore = ltLerp(ltAnim.fore, data.zd.fore, 0.07);
    ltAnim.cells = ltLerp(ltAnim.cells, data.cells, 0.05);
    ltAnim.wt = ltLerp(ltAnim.wt, data.wt, 0.07);

    const fw = W * 0.48, fh = Math.min(H * 0.88, fw * 2.4);
    const cx = W / 2 - 20, cy = H / 2;
    const pts = ltFootOutline(cx, cy, fw, fh);

    // Glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, fh * 0.6);
    grd.addColorStop(0, 'rgba(233,69,32,0.03)'); grd.addColorStop(1, 'rgba(10,10,12,0)');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);

    // Outline
    ltSmoothPath(ctx, pts); ctx.strokeStyle = 'rgba(233,69,32,0.15)'; ctx.lineWidth = 3; ctx.stroke();
    ltSmoothPath(ctx, pts); ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();

    // Cells
    const topY = cy - fh/2;
    const aspect = fw / fh;
    const cols = Math.round(Math.sqrt(ltAnim.cells * aspect));
    const rows = Math.round(ltAnim.cells / cols);
    const sx = fw / cols, sy = fh / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const px = (cx - fw/2) + c*sx + (r%2 ? sx*0.5 : 0) + sx/2;
            const py = topY + r*sy + sy/2;
            if (!ltIsInside(px, py, pts)) continue;
            const t = (py - topY) / fh;
            let density = t < 0.35 ? ltLerp(ltAnim.fore, ltAnim.mid, t/0.35) : t < 0.65 ? ltAnim.mid : ltLerp(ltAnim.mid, ltAnim.heel, (t-0.65)/0.35);
            const wNorm = (ltAnim.wt - 0.57) / (1.71 - 0.57);
            const ed = density + wNorm * 0.4;
            const col = ltDensityColor(ed);
            const baseR = sx * 0.38;
            const cellR = baseR * (2.2 - wNorm * 1.2 - density * 0.3);
            ctx.beginPath();
            for (let s = 0; s <= 6; s++) {
                const angle = (s/6)*Math.PI*2 - Math.PI/6;
                const hx = px + Math.cos(angle)*cellR, hy = py + Math.sin(angle)*cellR;
                if (s === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
            }
            ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${col.a})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${col.a*0.8})`;
            ctx.lineWidth = 0.3 + wNorm*1.5 + density*0.3;
            ctx.stroke();
        }
    }

    // Zone labels
    ctx.font = '500 11px "IBM Plex Mono"'; ctx.textAlign = 'left';
    const labelX = cx + fw/2 + 20;
    [{label:'FOREFOOT',y:topY+fh*0.15,d:ltAnim.fore},{label:'MIDFOOT',y:topY+fh*0.5,d:ltAnim.mid},{label:'HEEL',y:topY+fh*0.85,d:ltAnim.heel}].forEach(z => {
        const isMax = z.d >= Math.max(ltAnim.heel, ltAnim.mid, ltAnim.fore) - 0.05;
        ctx.fillStyle = isMax ? '#E94520' : 'rgba(255,255,255,0.3)';
        ctx.fillText(z.label, labelX, z.y-4);
        ctx.font = '400 18px "IBM Plex Mono"';
        ctx.fillText(z.d.toFixed(2)+'x', labelX, z.y+16);
        ctx.font = '500 11px "IBM Plex Mono"';
        ctx.beginPath(); ctx.moveTo(labelX-4, z.y+4); ctx.lineTo(cx+fw/2+4, z.y+4);
        ctx.strokeStyle = isMax ? 'rgba(233,69,32,0.3)' : 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    });

    // Stats
    const el = id => document.getElementById(id);
    el('lt-st-cells').textContent = Math.round(ltAnim.cells).toLocaleString();
    el('lt-st-size').textContent = `${data.cellMin}–${data.cellMax}`;
    el('lt-st-wall').textContent = `${data.wallMin}–${data.wallMax}`;
    el('lt-st-stiff').textContent = data.stiff;
    el('lt-st-weight').textContent = data.weight + 'g';

    // Zone bar
    const maxD = Math.max(ltAnim.heel, ltAnim.mid, ltAnim.fore);
    const zh = el('lt-zb-heel'), zm = el('lt-zb-mid'), zf = el('lt-zb-fore');
    if (zh) { zh.style.flex = ltAnim.heel; zh.textContent = `Heel ${ltAnim.heel.toFixed(1)}x`; zh.style.background = ltAnim.heel >= maxD-0.05 ? '#E94520' : '#2A2A30'; }
    if (zm) { zm.style.flex = ltAnim.mid; zm.textContent = `Mid ${ltAnim.mid.toFixed(1)}x`; zm.style.background = ltAnim.mid >= maxD-0.05 ? '#E94520' : '#2A2A30'; }
    if (zf) { zf.style.flex = ltAnim.fore; zf.textContent = `Fore ${ltAnim.fore.toFixed(1)}x`; zf.style.background = ltAnim.fore >= maxD-0.05 ? '#E94520' : '#2A2A30'; }

    // Performance
    const avgD = (ltAnim.heel+ltAnim.mid+ltAnim.fore)/3;
    const wNP = (ltAnim.wt-0.57)/(1.71-0.57);
    const cN = (ltAnim.cells-1000)/(4500-1000);
    const perf = {
        impact: Math.round(Math.min(100, ltAnim.heel*40+wNP*25+cN*15)),
        energy: Math.round(Math.min(100, cN*50+ltAnim.fore*20+wNP*10)),
        flex:   Math.round(Math.min(100, (1.5-avgD)*60+(1-wNP)*30+20)),
        stab:   Math.round(Math.min(100, ltAnim.mid*35+wNP*30+cN*15)),
        wt:     Math.round(Math.min(100, (1-cN)*55+(1-wNP)*35+10)),
        dur:    Math.round(Math.min(100, wNP*40+avgD*25+cN*20))
    };
    const pDesc = {
        impact: ltAnim.heel>1.2?'Dense heel cells absorb heavy landing force':ltAnim.fore>1.2?'Forefoot density cushions toe strikes':'Balanced absorption across sole',
        energy: cN>0.6?'Micro-cells maximize spring effect':wNP>0.6?'Thick walls store elastic energy':'Moderate cell count balances return and comfort',
        flex: avgD<1.0?'Large sparse cells bend easily at toe-off':wNP>0.6?'Dense structure limits flex for stability':'Moderate flex through midfoot transition',
        stab: ltAnim.mid>1.2?'Dense midfoot prevents lateral roll':wNP>0.6?'Heavy-duty walls resist deformation':'Natural stability from balanced density',
        wt: cN<0.3?'Fewer cells = ultra-light construction':cN>0.7?'High cell count adds material weight':'Balanced cell count for moderate weight',
        dur: wNP>0.6?'Thick walls resist compression fatigue':avgD>1.2?'Dense packing distributes stress evenly':'Standard durability for regular use'
    };
    ['impact','energy','flex','stab','wt','dur'].forEach(k => {
        const bar = el('lt-pf-'+k), val = el('lt-pv-'+k), desc = el('lt-pd-'+k);
        if (bar) { bar.style.width = perf[k]+'%'; bar.style.background = perf[k]>=75?'#E94520':perf[k]>=50?'#111':'#999'; }
        if (val) val.textContent = perf[k];
        if (desc) desc.textContent = pDesc[k];
    });

    ltRaf = requestAnimationFrame(ltDrawLoop);
}

function populateSpec() {
    setText('spec-unit-id', spec.unitID);
    setText('spec-cells', spec.lattice.totalCells.toLocaleString());
    setText('spec-cell-size', `${spec.lattice.cellSizeRange.min} — ${spec.lattice.cellSizeRange.max} mm`);
    setText('spec-wall', `${spec.lattice.wallRange.min} — ${spec.lattice.wallRange.max} mm`);
    setText('spec-tread-nodes', '30');
    setText('spec-tread-depth', `${spec.treadNodes[0].depth} — ${spec.treadNodes[spec.treadNodes.length - 1].depth} mm`);
    setText('spec-upper-density', `${Math.min(...spec.upper.map(u => u.density))} — ${Math.max(...spec.upper.map(u => u.density))} g/m²`);
    setText('spec-weight', `${spec.lattice.weight}g`);

    // Carbon plate
    const cpSec = document.getElementById('carbon-plate-sec');
    if (cpSec) {
        if (spec.carbonPlate.enabled) {
            cpSec.style.display = 'block';
            setText('spec-carbon-mat', spec.carbonPlate.material);
            setText('spec-carbon-thick', `${spec.carbonPlate.thickness} mm`);
            setText('spec-carbon-stiff', `${spec.carbonPlate.stiffness} GPa`);
            setText('spec-carbon-curve', 'Rocker');
        } else {
            cpSec.style.display = 'none';
        }
    }
}

function populateComparison() {
    const el = document.getElementById('comparison-bars');
    if (!el) return;
    el.innerHTML = '';

    spec.comparison.forEach(item => {
        const sign = item.delta >= 0 ? '+' : '';
        const cls = item.delta >= 0 ? 'cmp-pos' : 'cmp-neg';
        const bw = Math.min(100, Math.abs(item.delta) + 50);
        const ac = Math.abs(item.delta) > 25 ? ' cmp-fill-ac' : '';

        const div = document.createElement('div');
        div.className = 'cmp-item';
        div.innerHTML = `
            <div class="cmp-lb">${item.label}</div>
            <div class="cmp-delta ${cls}">${sign}${item.delta}%</div>
            <div class="cmp-bar"><div class="cmp-fill${ac}" style="width:${bw}%"></div></div>`;
        el.appendChild(div);
    });
}

/* ============================================
   AI RENDER (DALL-E)
   ============================================ */

const DEFAULT_API_KEY = '';

function getApiKey() {
    return localStorage.getItem('axon_openai_key') || DEFAULT_API_KEY;
}

function showApiModal() {
    const modal = document.getElementById('api-modal');
    if (modal) modal.classList.add('open');
}

function hideApiModal() {
    const modal = document.getElementById('api-modal');
    if (modal) modal.classList.remove('open');
}

function buildPrompt(spec) {
    const p = spec.profile;
    const colorway = document.querySelector('.cw-sw.active')?.dataset.colorway || 'void';
    const colorDescs = {
        void: 'deep black at the outsole, smoothly transitioning through charcoal grey, fading to pure white at the ankle collar',
        bone: 'warm tan-beige at the outsole, gently blending through soft cream, fading to clean white at the ankle collar',
        signal: 'rich burnt orange-red at the outsole, smoothly fading through soft peach, ending in pure white at the ankle collar',
        glacier: 'deep ocean blue at the outsole, gradually transitioning through pale ice blue, fading to pure white at the ankle collar',
        moss: 'dark forest green at the outsole, smoothly fading through sage, ending in pure white at the ankle collar',
        slate: 'dark steel blue at the outsole, gently blending through light grey-blue, fading to pure white at the ankle collar'
    };
    const colorDesc = colorDescs[colorway] || colorDescs.void;

    const carbonDesc = spec.carbonPlate.enabled
        ? ` with visible full-length carbon fiber plate (${spec.carbonPlate.thickness}mm)`
        : '';

    const purposeStyle = {
        beginner: 'cushioned, supportive, comfortable silhouette with thick midsole',
        training: 'balanced everyday trainer, medium profile, versatile',
        longdist: 'lightweight, streamlined, slim aerodynamic silhouette',
        racing: 'aggressive, razor-sharp low-profile racing flat'
    };
    const style = purposeStyle[p.load.activityType] || purposeStyle.training;

    const zd = spec.lattice.zoneDensity || {};
    const densityDesc = zd.heelDensity > 1.2 ? 'denser cells concentrated at heel'
        : zd.forefootDensity > 1.2 ? 'denser cells concentrated at forefoot'
        : zd.midfootDensity > 1.2 ? 'denser cells concentrated at midfoot'
        : 'evenly distributed cell density';
    const latticeDesc = `3D-printed gyroid lattice midsole with ${spec.lattice.totalCells.toLocaleString()} cells, ${densityDesc}, cell size ${spec.lattice.cellSizeRange.min}–${spec.lattice.cellSizeRange.max}mm`;
    const upperDesc = `technical knit upper with variable density zones (${Math.min(...spec.upper.map(u => u.density))}–${Math.max(...spec.upper.map(u => u.density))} g/m²)`;

    // Randomized variation elements
    const angles = ['3/4 front angle', 'side profile view', 'dramatic low angle from below', '3/4 rear angle'];
    const details = [
        'Emphasize the lattice midsole structure with visible cell geometry.',
        'Focus on the upper knit texture with gradient mesh density transitions.',
        'Highlight the sole architecture and heel counter structure.',
        'Show the full silhouette with emphasis on aerodynamic flow lines.'
    ];
    const mutations = [
        'Make the toe box more streamlined and pointed.',
        'Exaggerate the heel geometry with a dramatic flared counter.',
        'Add a visible split-sole design element.',
        'Make the collar higher with a sock-like integrated ankle wrap.',
        'Add exposed structural ribs along the midfoot.',
        'Integrate a visible air channel running through the midsole.'
    ];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    const detail = details[Math.floor(Math.random() * details.length)];
    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    const purpose = p.load.activityType;

    // Long distance: preserve reference sole cell/mesh structure exactly
    if (purpose === 'longdist') {
        const weightFactor = p.load.bodyWeight / 70;
        const cellSizeNote = weightFactor > 1.1 ? 'Make cells slightly smaller and denser for heavier load.' :
            weightFactor < 0.9 ? 'Make cells slightly larger and more open for lighter load.' :
            'Keep cell size as shown in the reference.';
        return `CRITICAL: Keep the midsole lattice cell structure and mesh pattern from this reference image EXACTLY as-is — preserve the solid sections, the open mesh geometry, the cell shape, and the visible 3D-printed lattice architecture. Do NOT change the sole structure. ${cellSizeNote} You may redesign the UPPER portion only: change the silhouette, knit pattern, collar shape, or surface details. IMPORTANT COLOR: The shoe has a smooth natural ombré gradient — ${colorDesc}. The gradient must flow seamlessly from bottom to top with no hard edges. Specs: ${style}, ${upperDesc}${carbonDesc}. ${detail} Clean white studio background, soft diffused product photography lighting. ${angle}. No logos, no text, no brand marks, no neon glow.`;
    }

    return `Use this shoe as STYLE INSPIRATION — study its sculptural language and structural philosophy. REDESIGN a new original shoe that shares the same design DNA but is clearly a different product. ${mutation} IMPORTANT COLOR: The shoe has a smooth natural ombré gradient — ${colorDesc}. The gradient must flow seamlessly from bottom to top with no hard edges. Specs: ${style}, ${latticeDesc}, ${upperDesc}${carbonDesc}. ${detail} Clean white studio background, soft diffused product photography lighting. ${angle}. No logos, no text, no brand marks, no neon glow.`;
}

function buildFallbackPrompt(spec) {
    const p = spec.profile;
    const colorway = document.querySelector('.cw-sw.active')?.dataset.colorway || 'void';
    const colorDescs = {
        void: 'deep black at the outsole, smoothly transitioning through charcoal grey, fading to pure white at the ankle collar',
        bone: 'warm tan-beige at the outsole, gently blending through soft cream, fading to clean white at the ankle collar',
        signal: 'rich burnt orange-red at the outsole, smoothly fading through soft peach, ending in pure white at the ankle collar',
        glacier: 'deep ocean blue at the outsole, gradually transitioning through pale ice blue, fading to pure white at the ankle collar',
        moss: 'dark forest green at the outsole, smoothly fading through sage, ending in pure white at the ankle collar',
        slate: 'dark steel blue at the outsole, gently blending through light grey-blue, fading to pure white at the ankle collar'
    };
    const colorDesc = colorDescs[colorway] || colorDescs.void;

    const strikeMap = { heel: 'reinforced heel counter', midfoot: 'balanced midfoot platform', forefoot: 'aggressive forefoot geometry' };
    const activityMap = { beginner: 'beginner comfort running', training: 'daily training', longdist: 'long distance endurance', racing: 'competitive racing' };

    const latticeDesc = `gyroid lattice midsole with ${spec.lattice.totalCells.toLocaleString()} cells`;
    const carbonDesc = spec.carbonPlate.enabled
        ? ` Full-length embedded carbon fiber plate (${spec.carbonPlate.thickness}mm).`
        : '';

    return `High-end product photograph of a futuristic performance shoe. IMPORTANT COLOR: The shoe has a smooth natural ombré gradient — ${colorDesc}. The gradient must flow seamlessly from bottom to top with no hard edges. 3D-printed ${latticeDesc} visible through semi-translucent sole.${carbonDesc} ${strikeMap[p.biomechanics.strikePattern]}. Designed for ${activityMap[p.load.activityType]}. Clean white studio background, soft studio lighting, 3/4 angle. No logos, no text. Photorealistic product photography.`;
}

async function getRandomRefImage(purpose) {
    const purposeMap = { beginner: 'beginner', training: 'training', longdist: 'longdist', racing: 'racing' };
    const folder = purposeMap[purpose] || 'training';
    try {
        const resp = await fetch(`/list-refs/${folder}`);
        if (!resp.ok) return null;
        const data = await resp.json();
        const files = data.files || [];
        if (files.length === 0) return null;
        const pick = files[Math.floor(Math.random() * files.length)];
        // Fetch image as blob then convert to File
        const imgResp = await fetch(`reference_shoes/${folder}/${pick}`);
        if (!imgResp.ok) return null;
        const blob = await imgResp.blob();
        return new File([blob], pick, { type: blob.type });
    } catch {
        return null;
    }
}

function addTerminalLine(text, cls = '') {
    const term = document.getElementById('render-terminal');
    if (!term) return;
    const div = document.createElement('div');
    div.className = cls;
    div.textContent = text;
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
}

async function generateRender() {
    const apiKey = getApiKey();
    if (!apiKey) { showApiModal(); return; }
    if (!spec) return;

    const section = document.getElementById('render-section');
    const loading = document.getElementById('render-loading');
    const result = document.getElementById('render-result');
    const terminal = document.getElementById('render-terminal');
    const status = document.getElementById('render-status');

    // Show section, reset state
    section.style.display = 'block';
    loading.style.display = 'block';
    result.style.display = 'none';
    terminal.innerHTML = '';
    status.textContent = 'Compiling biodata into visual signal...';

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Terminal log
    addTerminalLine('> initializing render pipeline...');
    await delay(200);
    addTerminalLine(`  unit: ${spec.unitID}`, 'tl-dim');
    addTerminalLine(`  colorway: ${document.querySelector('.cw-sw.active')?.dataset.colorway || 'void'}`, 'tl-dim');
    addTerminalLine(`  purpose: ${spec.profile.load.activityType}`, 'tl-dim');
    await delay(200);

    // Get reference image for this purpose
    addTerminalLine('> loading reference image...', '');
    const refFile = await getRandomRefImage(spec.profile.load.activityType);
    const useRef = !!refFile;

    const prompt = useRef ? buildPrompt(spec) : buildFallbackPrompt(spec);

    if (useRef) {
        addTerminalLine(`> reference: ${refFile.name}`, 'tl-dim');
    } else {
        addTerminalLine('> no reference found, using text-only generation', 'tl-dim');
    }

    addTerminalLine('> sending to GPT-4o...', '');
    status.textContent = 'Generating render — this may take 20-30 seconds...';

    try {
        let b64;

        if (useRef) {
            // Reference-based: use /v1/images/edits
            const formData = new FormData();
            formData.append('model', 'gpt-image-1');
            formData.append('image[]', refFile);
            formData.append('prompt', prompt);
            formData.append('size', '1536x1024');
            formData.append('quality', 'high');

            const response = await fetch('https://api.openai.com/v1/images/edits', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}` },
                body: formData
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error?.message || `API error ${response.status}`);
            }

            const data = await response.json();
            b64 = data.data[0]?.b64_json;
        } else {
            // Fallback: text-only generation
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-image-1',
                    prompt: prompt,
                    n: 1,
                    size: '1536x1024',
                    quality: 'high'
                })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error?.message || `API error ${response.status}`);
            }

            const data = await response.json();
            b64 = data.data[0]?.b64_json;
        }

        if (!b64) throw new Error('No image returned');

        addTerminalLine('> render received.', 'tl-ac');

        // Upload to Supabase Storage
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `${spec.unitID.toLowerCase()}_${timestamp}.png`;
        let imageUrl = '';
        try {
            addTerminalLine('> uploading to cloud...', 'tl-mu');
            const publicUrl = await uploadImage(b64, filename);
            if (publicUrl) {
                imageUrl = publicUrl;
                addTerminalLine(`> saved: ${filename}`, 'tl-ac');
            }
        } catch {
            imageUrl = `data:image/png;base64,${b64}`;
        }
        if (!imageUrl) imageUrl = `data:image/png;base64,${b64}`;

        const revisedPrompt = prompt;

        await delay(300);

        // Show result
        loading.style.display = 'none';
        result.style.display = 'block';
        document.getElementById('render-image').src = imageUrl;
        document.getElementById('render-prompt-text').textContent = revisedPrompt;

        // Fill description card
        populateDescCard();

        // Add to history
        addToHistory(imageUrl, revisedPrompt, spec.unitID);

    } catch (err) {
        addTerminalLine(`> ERROR: ${err.message}`, 'tl-ac');
        status.textContent = 'Render failed. Check your API key and try again.';

        if (err.message.includes('API key') || err.message.includes('401') || err.message.includes('Incorrect')) {
            localStorage.removeItem('axon_openai_key');
        }
    }
}

function populateDescCard() {
    if (!spec) return;
    const p = spec.profile;
    const colorway = document.querySelector('.cw-sw.active')?.dataset.colorway || 'void';

    const purposeNames = { beginner: 'Beginner', training: 'Training', longdist: 'Long Distance', racing: 'Racing' };
    const strikeNames = { heel: 'Heel Strike', midfoot: 'Midfoot Strike', forefoot: 'Forefoot Strike' };
    const colorNames = { void: 'Void', bone: 'Bone', signal: 'Signal', glacier: 'Glacier', moss: 'Moss', slate: 'Slate' };

    setText('rdc-id', spec.unitID);
    setText('rdc-purpose', purposeNames[p.load.activityType] || p.load.activityType);
    setText('rdc-foot', `${p.geometry.footLength}mm × ${p.geometry.footWidth}mm`);
    setText('rdc-strike', strikeNames[p.biomechanics.strikePattern] || p.biomechanics.strikePattern);
    setText('rdc-colorway', colorNames[colorway] || colorway);
    setText('rdc-lattice', `${spec.lattice.totalCells.toLocaleString()} cells`);
    setText('rdc-upper', `${Math.min(...spec.upper.map(u => u.density))}–${Math.max(...spec.upper.map(u => u.density))} g/m²`);
    setText('rdc-weight', `${spec.lattice.weight}g per shoe`);

    const carbonRow = document.getElementById('rdc-carbon-row');
    if (spec.carbonPlate?.enabled) {
        if (carbonRow) carbonRow.style.display = 'flex';
        setText('rdc-carbon', `${spec.carbonPlate.thickness}mm plate`);
    } else if (carbonRow) {
        carbonRow.style.display = 'none';
    }

    // Summary text
    const summaries = {
        beginner: `Built for new runners finding their stride. A forgiving ${spec.lattice.totalCells.toLocaleString()}-cell lattice absorbs impact across ${p.geometry.footLength}mm, while variable-density knit adapts to your gait as it develops.`,
        training: `Your daily training partner. ${spec.lattice.totalCells.toLocaleString()} gyroid cells tuned to ${p.load.bodyWeight}kg at ${p.biomechanics.cadence} spm. Balanced cushion-to-response ratio for consistent mileage.`,
        longdist: `Engineered for the long signal. ${spec.lattice.totalCells.toLocaleString()} cells optimized for sustained energy return over distance. Every gram measured — ${spec.lattice.weight}g of pure endurance architecture.`,
        racing: `Maximum propulsion. Full-length ${spec.carbonPlate?.thickness || 1.2}mm carbon plate embedded in a ${spec.lattice.totalCells.toLocaleString()}-cell lattice. ${spec.lattice.weight}g. Built to race.`
    };
    setText('rdc-summary', summaries[p.load.activityType] || summaries.training);

    // Performance bars
    const cushionMap = { firm: 45, balanced: 65, soft: 85 };
    const stabilityBase = p.biomechanics.pronationType === 'neutral' ? 80 : p.biomechanics.pronationType === 'over' ? 60 : 50;
    const archStab = { low: -5, medium: 0, high: 10 };
    const activityReturn = { beginner: 50, training: 65, longdist: 78, racing: 92 };
    const activityResponsive = { beginner: 40, training: 60, longdist: 70, racing: 95 };
    const activityDurability = { beginner: 80, training: 75, longdist: 85, racing: 45 };

    const perfMetrics = [
        { label: 'Cushion', value: Math.min(100, (cushionMap[p.load.cushionPref] || 65) + (p.load.activityType === 'beginner' ? 10 : 0)) },
        { label: 'Stability', value: Math.min(100, stabilityBase + (archStab[p.geometry.archHeight] || 0)) },
        { label: 'Energy Return', value: activityReturn[p.load.activityType] || 65 },
        { label: 'Responsiveness', value: activityResponsive[p.load.activityType] || 60 },
        { label: 'Durability', value: activityDurability[p.load.activityType] || 75 },
        { label: 'Weight', value: Math.min(100, Math.max(20, 100 - (spec.lattice.weight - 180) / 2)) }
    ];

    const perfEl = document.getElementById('rdc-perf');
    if (perfEl) {
        perfEl.innerHTML = '';
        perfMetrics.forEach(m => {
            const cls = m.value >= 75 ? 'high' : m.value >= 50 ? 'mid' : 'low';
            const item = document.createElement('div');
            item.className = 'rdc-perf-item';
            item.innerHTML = `
                <div class="rdc-perf-row">
                    <span class="rdc-perf-label">${m.label}</span>
                    <span class="rdc-perf-val">${m.value}/100</span>
                </div>
                <div class="rdc-perf-bar"><div class="rdc-perf-fill ${cls}" style="width:0%"></div></div>`;
            perfEl.appendChild(item);
            // Animate bar
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    item.querySelector('.rdc-perf-fill').style.width = m.value + '%';
                });
            });
        });
    }

    // Personal message
    const name = document.getElementById('runner-name')?.value?.trim();
    const personal = document.getElementById('rdc-personal');
    if (name && personal) {
        personal.style.display = 'block';
        setText('rdc-personal-text', `Engineered for ${name}. One signal. One shoe. Yours.`);
    } else if (personal) {
        personal.style.display = 'none';
    }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ---- Render History ---- */
let renderHistory = JSON.parse(localStorage.getItem('axon_render_history') || '[]');

function addToHistory(imageUrl, prompt, unitID) {
    const p = spec.profile;
    const colorway = document.querySelector('.cw-sw.active')?.dataset.colorway || 'void';
    const name = document.getElementById('runner-name')?.value?.trim() || '';
    const purposeNames = { beginner: 'Beginner', training: 'Training', longdist: 'Long Distance', racing: 'Racing' };
    const strikeNames = { heel: 'Heel Strike', midfoot: 'Midfoot Strike', forefoot: 'Forefoot Strike' };
    const colorNames = { void: 'Void', bone: 'Bone', signal: 'Signal', glacier: 'Glacier', moss: 'Moss', slate: 'Slate' };

    const entry = {
        id: unitID,
        url: imageUrl,
        prompt,
        timestamp: new Date().toISOString(),
        name,
        spec: {
            purpose: purposeNames[p.load.activityType] || p.load.activityType,
            foot: `${p.geometry.footLength}mm × ${p.geometry.footWidth}mm`,
            strike: strikeNames[p.biomechanics.strikePattern] || p.biomechanics.strikePattern,
            colorway: colorNames[colorway] || colorway,
            lattice: `${spec.lattice.totalCells.toLocaleString()} cells`,
            upper: `${Math.min(...spec.upper.map(u => u.density))}–${Math.max(...spec.upper.map(u => u.density))} g/m²`,
            weight: `${spec.lattice.weight}g`,
            carbon: spec.carbonPlate?.enabled ? `${spec.carbonPlate.thickness}mm plate` : null
        }
    };
    renderHistory.unshift(entry);
    localStorage.setItem('axon_render_history', JSON.stringify(renderHistory));
    refreshHistoryGrid();
}

async function repairHistory() {
    try {
        const cloudFiles = await listImages();
        if (!cloudFiles.length) return;

        let changed = false;

        // Deduplicate by URL
        const seen = new Set();
        renderHistory = renderHistory.filter(entry => {
            if (!entry.url || seen.has(entry.url)) return false;
            seen.add(entry.url);
            return true;
        });

        // Add cloud files not yet in history
        const historyUrls = new Set(renderHistory.map(e => e.url));
        cloudFiles.forEach(({ name, url }) => {
            if (historyUrls.has(url)) return;
            const match = name.match(/^(ax-nv01-\d+)_(\d{4}-\d{2}-\d{2})T(\d{2}-\d{2}-\d{2})\.png$/i);
            const id = match ? match[1].toUpperCase() : name.replace('.png', '').toUpperCase();
            const ts = match ? `${match[2]}T${match[3].replace(/-/g, ':')}` : new Date().toISOString();
            renderHistory.push({ id, url, prompt: '', timestamp: ts, name: '', spec: null });
            changed = true;
        });

        renderHistory.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        if (changed) localStorage.setItem('axon_render_history', JSON.stringify(renderHistory));
    } catch {
        // Cloud not available — skip
    }
}

function refreshHistoryGrid() {
    const grid = document.getElementById('rh-grid');
    const count = document.getElementById('rh-count');
    if (!grid) return;

    count.textContent = renderHistory.length;
    grid.innerHTML = '';

    renderHistory.forEach((entry, i) => {
        const item = document.createElement('div');
        item.className = 'rh-item';
        item.innerHTML = `
            <img src="${entry.url}" alt="${entry.id}" loading="lazy">
            <div class="rh-item-overlay">${entry.id} · ${entry.timestamp.slice(0, 10)}</div>
        `;
        item.addEventListener('click', () => openLightbox(entry));
        grid.appendChild(item);
    });
}

function openLightbox(entry) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lb-image').src = entry.url;
    document.getElementById('lb-id').textContent = `${entry.id} — ${entry.timestamp.slice(0, 19).replace('T', ' ')}`;
    document.getElementById('lb-prompt').textContent = entry.prompt;

    // Description card
    const descEl = document.getElementById('lb-desc');
    if (descEl && entry.spec) {
        const s = entry.spec;
        const personalHtml = entry.name
            ? `<div class="lb-desc-personal">Engineered for ${entry.name}.</div>`
            : '';
        const carbonRow = s.carbon
            ? `<div class="lb-desc-row"><span class="lb-desc-k">Carbon</span><span class="lb-desc-v">${s.carbon}</span></div>`
            : '';

        descEl.innerHTML = `
            <div class="lb-desc-col">
                <div class="lb-desc-title">Nerve 001<span class="dot">.</span></div>
                <div class="lb-desc-sub">${entry.id}</div>
                ${personalHtml}
            </div>
            <div class="lb-desc-col">
                <div class="lb-desc-hd">Profile</div>
                <div class="lb-desc-row"><span class="lb-desc-k">Purpose</span><span class="lb-desc-v">${s.purpose}</span></div>
                <div class="lb-desc-row"><span class="lb-desc-k">Foot</span><span class="lb-desc-v">${s.foot}</span></div>
                <div class="lb-desc-row"><span class="lb-desc-k">Strike</span><span class="lb-desc-v">${s.strike}</span></div>
                <div class="lb-desc-row"><span class="lb-desc-k">Colorway</span><span class="lb-desc-v">${s.colorway}</span></div>
            </div>
            <div class="lb-desc-col">
                <div class="lb-desc-hd">Construction</div>
                <div class="lb-desc-row"><span class="lb-desc-k">Lattice</span><span class="lb-desc-v">${s.lattice}</span></div>
                <div class="lb-desc-row"><span class="lb-desc-k">Upper</span><span class="lb-desc-v">${s.upper}</span></div>
                ${carbonRow}
                <div class="lb-desc-row"><span class="lb-desc-k">Weight</span><span class="lb-desc-v">${s.weight}</span></div>
            </div>`;
        descEl.style.display = 'flex';
    } else if (descEl) {
        descEl.style.display = 'none';
    }

    lb.classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightbox')?.classList.remove('open');
}

function bindLightbox() {
    document.querySelector('.lb-backdrop')?.addEventListener('click', closeLightbox);
    document.querySelector('.lb-close')?.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function bindRenderControls() {
    // Generate button
    document.getElementById('generate-render')?.addEventListener('click', generateRender);
    document.getElementById('regenerate-render')?.addEventListener('click', generateRender);

    // Download render
    document.getElementById('download-render')?.addEventListener('click', async () => {
        const img = document.getElementById('render-image');
        if (!img?.src) return;
        try {
            const resp = await fetch(img.src);
            const blob = await resp.blob();
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${spec?.unitID || 'nerve-001'}-render.png`;
            a.click();
            URL.revokeObjectURL(a.href);
        } catch {
            window.open(img.src, '_blank');
        }
    });

    // API key modal
    document.getElementById('api-close')?.addEventListener('click', hideApiModal);
    document.querySelector('.api-backdrop')?.addEventListener('click', hideApiModal);
    document.getElementById('api-key-submit')?.addEventListener('click', () => {
        const input = document.getElementById('api-key-input');
        const key = input?.value?.trim();
        if (key && key.startsWith('sk-')) {
            localStorage.setItem('axon_openai_key', key);
            hideApiModal();
            generateRender();
        }
    });
    document.getElementById('api-key-input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('api-key-submit')?.click();
    });
}

/* ============================================
   UTILITY
   ============================================ */

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function typeText(el, text) {
    el.textContent = '';
    let i = 0;
    const span = document.createElement('span');
    span.className = 's2-typed';
    el.appendChild(span);
    (function tick() {
        if (i < text.length) {
            span.textContent += text[i++];
            setTimeout(tick, 12 + Math.random() * 20);
        } else {
            span.classList.remove('s2-typed');
        }
    })();
}

function downloadJSON() {
    if (!spec) return;
    const data = {
        product: 'NERVE 001.',
        unitID: spec.unitID,
        brand: 'AXON.',
        generated: spec.timestamp,
        profile: spec.profile,
        lattice: {
            totalCells: spec.lattice.totalCells,
            cellSizeRange: spec.lattice.cellSizeRange,
            wallRange: spec.lattice.wallRange,
            stiffness: spec.lattice.stiffness,
            weight: spec.lattice.weight + 'g'
        },
        tread: { nodeCount: spec.treadNodes.length, nodes: spec.treadNodes },
        upper: { knitZones: spec.upper },
        comparison: spec.comparison
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${spec.unitID.toLowerCase()}-config.json`;
    a.click();
    URL.revokeObjectURL(a.href);
}

/* ============================================
   TAB NAVIGATION
   ============================================ */

tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        if (i + 1 < currentStage) goToStage(i + 1);
    });
});

/* ============================================
   NAV: Customize / Structure toggle
   ============================================ */

let navMode = 'customize'; // 'customize' or 'structure'
const navCustomize = document.getElementById('nav-customize');
const navStructure = document.getElementById('nav-structure');
const stageTabsEl = document.querySelector('.stabs');
const s5El = document.getElementById('s5');

function showCustomize() {
    if (navMode === 'customize') return;
    navMode = 'customize';
    navCustomize?.classList.add('active');
    navStructure?.classList.remove('active');
    if (stageTabsEl) stageTabsEl.style.display = '';
    if (s5El) s5El.classList.remove('active');
    // Show current stage
    Object.values(stages).forEach((el, idx) => {
        if (el && el !== s5El) el.classList.toggle('active', idx + 1 === currentStage);
    });
    // Restore stage tabs
    tabs.forEach((tab, i) => {
        tab.classList.remove('active', 'done');
        if (i + 1 === currentStage) tab.classList.add('active');
        else if (i + 1 < currentStage) tab.classList.add('done');
    });
    if (ltRaf) { cancelAnimationFrame(ltRaf); ltRaf = null; }
    window.scrollTo(0, 0);
}

function showStructure() {
    if (navMode === 'structure') return;
    navMode = 'structure';
    navStructure?.classList.add('active');
    navCustomize?.classList.remove('active');
    if (stageTabsEl) stageTabsEl.style.display = 'none';
    // Hide all stages, show s5
    Object.values(stages).forEach(el => el && el.classList.remove('active'));
    if (s5El) s5El.classList.add('active');
    initStage5();
    window.scrollTo(0, 0);
}

navCustomize?.addEventListener('click', (e) => { e.preventDefault(); showCustomize(); });
navStructure?.addEventListener('click', (e) => { e.preventDefault(); showStructure(); });

/* ============================================
   SCANNER
   ============================================ */

let scannerModal = null;

function activateScanner() {
    const btn = document.querySelector('.scan-btn');
    if (!btn) return;

    btn.disabled = false;
    btn.classList.add('active');

    btn.addEventListener('click', () => {
        if (scannerModal) return; // prevent double-open
        scannerModal = new ScannerModal((scanData) => {
            // Apply scan data to profile
            profile = onScannerData(scanData);
            syncSlidersToProfile();
            updateFootCanvas();
            updateCTA();
            scannerModal = null;
        });
        scannerModal.open();

        // Clean up reference when modal closes
        const origClose = scannerModal.close.bind(scannerModal);
        scannerModal.close = () => { origClose(); scannerModal = null; };
    });
}

function syncSlidersToProfile() {
    // Sync range sliders
    syncSlider('foot-length', 'foot-length-val', profile.geometry.footLength, INPUT_RANGES.footLength);
    syncSlider('foot-width', 'foot-width-val', profile.geometry.footWidth, INPUT_RANGES.footWidth);
    syncSlider('cadence', 'cadence-val', profile.biomechanics.cadence, INPUT_RANGES.cadence);
    syncSlider('body-weight', 'body-weight-val', profile.load.bodyWeight, INPUT_RANGES.bodyWeight);

    // Sync selectors
    syncSelector('arch-height', profile.geometry.archHeight);
    syncSelector('strike-pattern', profile.biomechanics.strikePattern);
    syncSelector('pronation', profile.biomechanics.pronationType);
    syncSelector('activity', profile.load.activityType);
    syncSelector('ankle-flex', profile.biomechanics.ankleFlexibility);
    syncSelector('toe-splay', profile.geometry.toeSplay);
    syncSelector('cushion-pref', profile.load.cushionPref);

    // Update pulse
    updatePulse(profile.biomechanics.cadence);
}

function syncSlider(sliderId, valId, value, range) {
    const sl = document.getElementById(sliderId);
    const vl = document.getElementById(valId);
    if (sl) sl.value = value;
    if (vl) vl.textContent = `${value} ${range.unit || ''}`;
}

function syncSelector(groupId, value) {
    const el = document.getElementById(groupId);
    if (!el) return;
    el.querySelectorAll('.isel-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === value);
    });
}

window.axonScannerAPI = {
    connectScanner: () => {
        document.querySelector('.scan-btn')?.click();
    },
    onScannerData: (raw) => {
        profile = onScannerData(raw);
        syncSlidersToProfile();
        updateFootCanvas();
        updateCTA();
    }
};

/* ============================================
   FADE-IN OBSERVER
   ============================================ */

const fiObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: .15 });

/* ============================================
   INIT
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    bindInputs();
    bindRenderControls();
    bindLightbox();
    await repairHistory();
    refreshHistoryGrid();
    activateScanner();
    initStage1();

    // Observe fade-in elements
    document.querySelectorAll('.fi').forEach(el => fiObs.observe(el));

    // Trigger initial fade-ins
    stages[1]?.querySelectorAll('.fi').forEach(el => el.classList.add('vis'));
});
