/* ============================================
   AXON. — Customize Data Engine
   Profile → Spec computation
   ============================================ */

export const INPUT_RANGES = {
    footLength: { min: 220, max: 310, default: 265, unit: 'mm' },
    footWidth:  { min: 80,  max: 120, default: 100, unit: 'mm' },
    cadence:    { min: 120, max: 210, default: 170, unit: 'spm' },
    bodyWeight: { min: 40,  max: 120, default: 70,  unit: 'kg' }
};

export function createDefaultProfile() {
    return {
        geometry: {
            footLength: 265,
            footWidth: 100,
            archHeight: 'medium',
            toeSplay: 'normal'
        },
        biomechanics: {
            strikePattern: 'heel',
            pronationType: 'neutral',
            cadence: 170,
            ankleFlexibility: 'normal'
        },
        load: {
            bodyWeight: 70,
            activityType: 'mixed',
            cushionPref: 'balanced'
        }
    };
}

export function isProfileComplete(profile) {
    const g = profile.geometry;
    const b = profile.biomechanics;
    const l = profile.load;
    return g.footLength > 0 && g.footWidth > 0 && b.cadence > 0 && l.bodyWeight > 0;
}

export function computeFullSpec(profile) {
    const p = profile;
    const lengthFactor = p.geometry.footLength / 265;
    const widthFactor = p.geometry.footWidth / 100;
    const weightFactor = p.load.bodyWeight / 70;

    // Arch factor
    const archMap = { low: 0.7, medium: 1.0, high: 1.3 };
    const archFactor = archMap[p.geometry.archHeight] || 1.0;

    // Strike distribution
    const strikeDistributions = {
        heel:     { heel: 0.45, midfoot: 0.25, forefoot: 0.30 },
        midfoot:  { heel: 0.20, midfoot: 0.50, forefoot: 0.30 },
        forefoot: { heel: 0.10, midfoot: 0.25, forefoot: 0.65 }
    };
    const strikeDist = strikeDistributions[p.biomechanics.strikePattern] || strikeDistributions.heel;

    // Pronation offset
    const pronationOffsets = { under: -0.15, neutral: 0, over: 0.15 };
    const pronOff = pronationOffsets[p.biomechanics.pronationType] || 0;

    // Total ground reaction force
    const totalGRF = Math.round(p.load.bodyWeight * 9.81 * (1 + p.biomechanics.cadence / 400));

    // Pressure map zones
    const zones = [
        { name: 'Heel',     forceN: Math.round(totalGRF * strikeDist.heel), x: 0.15, y: 0.80 },
        { name: 'Midfoot',  forceN: Math.round(totalGRF * strikeDist.midfoot), x: 0.50, y: 0.50 },
        { name: 'Forefoot', forceN: Math.round(totalGRF * strikeDist.forefoot), x: 0.75, y: 0.25 },
        { name: 'Hallux',   forceN: Math.round(totalGRF * 0.12), x: 0.90, y: 0.35 }
    ];
    const peakZone = zones.reduce((a, b) => a.forceN > b.forceN ? a : b);

    // Lattice computation — affected by purpose + strike + body
    const purposeCells = { beginner: 1800, training: 2400, longdist: 2800, racing: 3200 };
    const baseCells = purposeCells[p.load.activityType] || 2400;
    const totalCells = Math.round(baseCells * lengthFactor * widthFactor * (0.8 + archFactor * 0.2));

    // Cell size: racing = small dense cells, beginner = large soft cells
    const purposeCellSize = { beginner: 0.4, training: 0, longdist: -0.3, racing: -0.6 };
    const cellAdj = purposeCellSize[p.load.activityType] || 0;
    const cellMin = +(2.0 + (1 - weightFactor) * 0.8 + cellAdj).toFixed(1);
    const cellMax = +(4.5 + (1 - weightFactor) * 1.0 + cellAdj).toFixed(1);

    // Wall thickness: heavier + racing = thicker walls
    const purposeWall = { beginner: -0.05, training: 0, longdist: 0.03, racing: 0.08 };
    const wallAdj = purposeWall[p.load.activityType] || 0;
    const wallMin = +(0.4 + weightFactor * 0.15 + wallAdj).toFixed(2);
    const wallMax = +(0.8 + weightFactor * 0.2 + wallAdj).toFixed(2);

    // Zone density distribution — strike pattern affects where cells concentrate
    const strikeDensity = {
        heel:     { heelDensity: 1.4, midfootDensity: 1.0, forefootDensity: 0.8 },
        midfoot:  { heelDensity: 1.0, midfootDensity: 1.3, forefootDensity: 1.0 },
        forefoot: { heelDensity: 0.7, midfootDensity: 1.0, forefootDensity: 1.5 }
    };
    const zoneDensity = strikeDensity[p.biomechanics.strikePattern] || strikeDensity.heel;

    // Stiffness
    const activityStiffness = { beginner: 0.6, training: 0.8, longdist: 0.9, racing: 1.1 };
    const cushionStiffness = { firm: 1.2, balanced: 1.0, soft: 0.7 };
    const stiffness = +(
        (activityStiffness[p.load.activityType] || 0.8) *
        (cushionStiffness[p.load.cushionPref] || 1.0) *
        weightFactor
    ).toFixed(2);

    // Weight per shoe
    const weight = Math.round(180 + (totalCells / 100) * 2 + p.load.bodyWeight * 0.8);

    // Tread nodes
    const treadNodes = Array.from({ length: 30 }, (_, i) => {
        const t = i / 29;
        const zone = t < 0.3 ? 'heel' : t < 0.6 ? 'midfoot' : 'forefoot';
        const pressure = zones.find(z => z.name.toLowerCase() === zone)?.forceN || 100;
        return {
            index: i,
            zone,
            depth: +(1.5 + (pressure / totalGRF) * 3.5).toFixed(1),
            x: +(t * p.geometry.footLength).toFixed(0),
        };
    });

    // Upper knit zones
    const upper = [
        { zone: 'toe-box',  density: Math.round(180 + weightFactor * 40), stretch: 'high' },
        { zone: 'midfoot',  density: Math.round(220 + archFactor * 30), stretch: 'medium' },
        { zone: 'heel-cup', density: Math.round(260 + weightFactor * 50), stretch: 'low' },
        { zone: 'collar',   density: Math.round(160 + weightFactor * 20), stretch: 'high' },
        { zone: 'tongue',   density: Math.round(140), stretch: 'high' }
    ];

    // Carbon plate (racing only)
    const carbonPlate = p.load.activityType === 'racing' ? {
        enabled: true,
        material: 'Carbon fiber composite',
        thickness: +(1.2 + weightFactor * 0.3).toFixed(1),
        curvature: 'Propulsive rocker geometry',
        stiffness: +(38 + weightFactor * 8).toFixed(0),
        position: 'Full-length embedded between midsole layers'
    } : { enabled: false };

    // Body signal
    const complexity = p.biomechanics.cadence > 180 ? 'high' : p.biomechanics.cadence > 155 ? 'medium' : 'low';
    const symmetry = Math.abs(pronOff) < 0.05 ? 'symmetric' : Math.abs(pronOff) < 0.12 ? 'slight offset' : 'asymmetric';

    // Comparison vs baseline
    const comparison = [
        { label: 'Cushion response', delta: Math.round((stiffness - 0.8) * 30) },
        { label: 'Lateral stability', delta: Math.round(pronOff * -60 + archFactor * 8) },
        { label: 'Energy return', delta: Math.round((p.biomechanics.cadence - 170) / 5 + stiffness * 10) },
        { label: 'Ground contact', delta: Math.round((strikeDist.midfoot - 0.25) * 40) },
        { label: 'Weight efficiency', delta: Math.round((280 - weight) / 3) }
    ];

    // Unit ID
    const unitID = `AX-NV01-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;

    return {
        unitID,
        timestamp: new Date().toISOString(),
        profile: JSON.parse(JSON.stringify(p)),
        pressureMap: { zones, peakZone, totalGRF, strikeDist, pronationOffset: pronOff },
        lattice: { totalCells, cellSizeRange: { min: cellMin, max: cellMax }, wallRange: { min: wallMin, max: wallMax }, stiffness, weight, zoneDensity },
        treadNodes,
        upper,
        carbonPlate,
        bodySignal: { complexity, symmetry, cadence: p.biomechanics.cadence, archFactor },
        comparison
    };
}

export function onScannerData(raw) {
    const profile = createDefaultProfile();
    if (raw.footLength) profile.geometry.footLength = Math.round(Math.min(310, Math.max(220, raw.footLength)));
    if (raw.footWidth) profile.geometry.footWidth = Math.round(Math.min(120, Math.max(80, raw.footWidth)));
    if (raw.archHeight) profile.geometry.archHeight = raw.archHeight;
    if (raw.strikePattern) profile.biomechanics.strikePattern = raw.strikePattern;
    if (raw.pronation) profile.biomechanics.pronationType = raw.pronation;
    if (raw.cadence) profile.biomechanics.cadence = Math.round(raw.cadence);
    if (raw.bodyWeight) profile.load.bodyWeight = Math.round(raw.bodyWeight);
    return profile;
}
