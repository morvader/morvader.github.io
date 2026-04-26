// Builds the Spain SVG map from TopoJSON: mainland + Baleares are projected
// together; the Canary Islands are projected separately and dropped into an
// inset box overlapping the bottom-left (Atlantic) area of the map.

const MAINLAND_VIEWBOX = [750, 555];
const CANARIAS_OFFSET = [15, 443];
const CANARIAS_BOX = { x: 5, y: 430, w: 165, h: 110 };

// State exposed for the game module.
const provincesData = []; // { id, name, community, center: [x, y] }

function buildProjections(mainlandFeatures, canariasFeatures) {
    const mainland = d3.geoConicConformal()
        .center([0, 39.5])
        .rotate([3.5, 0])
        .parallels([36, 43])
        .fitSize([720, 520], { type: 'FeatureCollection', features: mainlandFeatures });

    const canarias = d3.geoConicConformal()
        .center([0, 28.3])
        .rotate([15.6, 0])
        .parallels([27, 29])
        .fitSize([135, 75], { type: 'FeatureCollection', features: canariasFeatures });

    return { mainland, canarias };
}

function drawCanariasInset(svg) {
    svgEl('rect', {
        x: CANARIAS_BOX.x, y: CANARIAS_BOX.y,
        width: CANARIAS_BOX.w, height: CANARIAS_BOX.h, rx: 6,
        fill: 'rgba(8,8,24,0.92)',
        stroke: 'rgba(255,255,255,0.18)',
        'stroke-width': 0.8,
        'stroke-dasharray': '3,3',
        'pointer-events': 'none',
    }, svg);
    const label = svgEl('text', {
        x: 87, y: 443,
        'text-anchor': 'middle',
        fill: 'rgba(255,255,255,0.35)',
        'font-size': '7px',
        'font-family': 'Bungee, sans-serif',
        'pointer-events': 'none',
    }, svg);
    label.textContent = 'CANARIAS';
}

function renderProvince(feature, container, pathGen, offset, onClick) {
    const id = feature.id;
    const name = normalizeName(feature.properties.name);
    const community = ID_TO_COMMUNITY[id];
    if (!community) return;

    const pathData = pathGen(feature);
    if (!pathData) return;

    const centroid = pathGen.centroid(feature);
    if (!centroid || isNaN(centroid[0])) return;

    const absCentroid = offset
        ? [centroid[0] + offset[0], centroid[1] + offset[1]]
        : [centroid[0], centroid[1]];
    const cssClass = COMMUNITY_CLASSES[community] || '';
    const idx = provincesData.length;

    provincesData.push({ id, name, community, center: absCentroid });

    const path = svgEl('path', {
        d: pathData,
        class: `province-path ${cssClass}`,
        'data-idx': idx,
        'data-name': name,
    }, container);
    path.addEventListener('click', () => onClick(idx));

    const label = svgEl('text', {
        x: centroid[0],
        y: centroid[1],
        class: 'province-label',
        'data-label-idx': idx,
    }, container);
    label.textContent = name;
}

function renderMap(topo, onProvinceClick) {
    const geojson = topojson.feature(topo, topo.objects.provinces);

    const validIds = new Set(Object.keys(ID_TO_COMMUNITY));
    const isMainland = (id) => validIds.has(id) && id !== '35' && id !== '38';
    const isCanarias = (id) => id === '35' || id === '38';

    const mainlandFeatures = geojson.features.filter(f => isMainland(f.id));
    const canariasFeatures = geojson.features.filter(f => isCanarias(f.id));

    const { mainland, canarias } = buildProjections(mainlandFeatures, canariasFeatures);

    const svg = document.getElementById('map-svg');
    svg.setAttribute('viewBox', `0 0 ${MAINLAND_VIEWBOX[0]} ${MAINLAND_VIEWBOX[1]}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.innerHTML = '';

    svgEl('rect', { width: MAINLAND_VIEWBOX[0], height: MAINLAND_VIEWBOX[1], fill: '#080818' }, svg);

    provincesData.length = 0;
    const mainlandPathGen = d3.geoPath().projection(mainland);
    const canariasPathGen = d3.geoPath().projection(canarias);

    // Mainland rendered first; Canarias inset sits on top in z-order.
    mainlandFeatures.forEach(f => renderProvince(f, svg, mainlandPathGen, null, onProvinceClick));

    // Internal borders for visual separation between provinces.
    const borders = topojson.mesh(topo, topo.objects.provinces, (a, b) =>
        a !== b && isMainland(a.id) && isMainland(b.id)
    );
    svgEl('path', {
        d: mainlandPathGen(borders),
        fill: 'none',
        stroke: 'rgba(200,200,255,0.15)',
        'stroke-width': 0.3,
        'pointer-events': 'none',
    }, svg);

    // Canarias inset drawn above mainland; pointer-events:none on the box
    // lets clicks pass through to any mainland province hidden beneath it.
    drawCanariasInset(svg);

    const canariasGroup = svgEl('g', {
        transform: `translate(${CANARIAS_OFFSET[0]},${CANARIAS_OFFSET[1]})`,
    }, svg);

    canariasFeatures.forEach(f => renderProvince(f, canariasGroup, canariasPathGen, CANARIAS_OFFSET, onProvinceClick));
}

function showMapError(message) {
    const titleEl = document.querySelector('#loading .logo-title');
    if (!titleEl) return;
    titleEl.textContent = message;
    titleEl.style.color = 'var(--red)';
    titleEl.style.fontSize = '16px';
}

// ---------------------------------------------------------------------------
// Pinch-to-zoom and pan for mobile
// ---------------------------------------------------------------------------

function initMapZoom() {
    const container = document.getElementById('map-container');
    const svg = document.getElementById('map-svg');

    let scale = 1, tx = 0, ty = 0;
    const MIN_SCALE = 1, MAX_SCALE = 5;
    let gesture = null;

    function applyTransform() {
        svg.style.transformOrigin = '0 0';
        svg.style.transform = scale <= 1 ? '' : `translate(${tx}px,${ty}px) scale(${scale})`;
    }

    function clampPan() {
        if (scale <= 1) { tx = 0; ty = 0; return; }
        const { width: cw, height: ch } = container.getBoundingClientRect();
        tx = Math.max(cw * (1 - scale), Math.min(0, tx));
        ty = Math.max(ch * (1 - scale), Math.min(0, ty));
    }

    container.addEventListener('touchstart', (e) => {
        const tl = Array.from(e.touches);
        if (tl.length === 2) {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            gesture = {
                type: 'pinch',
                startDist: Math.hypot(tl[1].clientX - tl[0].clientX, tl[1].clientY - tl[0].clientY),
                startMidX: (tl[0].clientX + tl[1].clientX) / 2 - rect.left,
                startMidY: (tl[0].clientY + tl[1].clientY) / 2 - rect.top,
                startScale: scale, startTx: tx, startTy: ty,
            };
        } else if (tl.length === 1) {
            gesture = {
                type: 'pan',
                startX: tl[0].clientX, startY: tl[0].clientY,
                startTx: tx, startTy: ty,
            };
        }
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!gesture) return;
        const tl = Array.from(e.touches);
        const rect = container.getBoundingClientRect();

        if (gesture.type === 'pinch' && tl.length >= 2) {
            const dist = Math.hypot(tl[1].clientX - tl[0].clientX, tl[1].clientY - tl[0].clientY);
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE,
                gesture.startScale * dist / gesture.startDist));
            const sf = newScale / gesture.startScale;
            const midX = (tl[0].clientX + tl[1].clientX) / 2 - rect.left;
            const midY = (tl[0].clientY + tl[1].clientY) / 2 - rect.top;
            // Zoom around the initial pinch centre, then apply midpoint translation.
            tx = gesture.startMidX * (1 - sf) + gesture.startTx * sf + (midX - gesture.startMidX);
            ty = gesture.startMidY * (1 - sf) + gesture.startTy * sf + (midY - gesture.startMidY);
            scale = newScale;
            clampPan();
            applyTransform();
        } else if (gesture.type === 'pan' && tl.length === 1 && scale > 1) {
            tx = gesture.startTx + tl[0].clientX - gesture.startX;
            ty = gesture.startTy + tl[0].clientY - gesture.startY;
            clampPan();
            applyTransform();
        }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
        const remaining = e.touches.length;
        if (remaining === 1 && gesture?.type === 'pinch') {
            const t = e.touches[0];
            gesture = { type: 'pan', startX: t.clientX, startY: t.clientY, startTx: tx, startTy: ty };
        } else if (remaining === 0) {
            gesture = null;
        }
        // Snap back when zoomed out below threshold.
        if (scale < 1.05) { scale = 1; tx = 0; ty = 0; applyTransform(); }
    }, { passive: false });

    window.resetMapZoom = function () {
        scale = 1; tx = 0; ty = 0;
        svg.style.transform = '';
    };
}
