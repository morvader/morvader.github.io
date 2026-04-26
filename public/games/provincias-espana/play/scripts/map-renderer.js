// Builds the Spain SVG map from TopoJSON: mainland + Baleares are projected
// together; the Canary Islands are projected separately and dropped into an
// inset placed in the south-west corner — geographically suggestive (Canarias
// are SW of the peninsula) and reusing the otherwise-empty Atlantic / Portugal
// area so the whole composition stays compact on small screens.

// Mainland is projected into [720, 520]. Canarias is placed in the empty
// Atlantic gap to the SW of the peninsula (west of Huelva, which starts at
// roughly x=120 in viewBox coords), so we don't need extra vertical space
// below mainland — the viewBox stays compact for phones.
const MAINLAND_VIEWBOX = [730, 525];
// Canarias inset sits in the SW Atlantic gap. We keep it strictly to the
// west of x≈110 to leave a safe margin from Huelva, and don't preserve the
// islands ↔ mainland scale ratio (explicitly accepted by the user).
const CANARIAS_OFFSET = [8, 470];
const CANARIAS_BOX = { x: 4, y: 458, w: 100, h: 56 };
const CANARIAS_FIT = [88, 36];

// State exposed for the game module.
const provincesData = []; // { id, name, community, center: [x, y] }

// Pan/zoom controller — set by setupPanZoom and consulted from the click
// handler so a finger-drag/pinch gesture doesn't fire a province click.
let panZoomController = null;

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
        .fitSize(CANARIAS_FIT, { type: 'FeatureCollection', features: canariasFeatures });

    return { mainland, canarias };
}

function drawCanariasInset(svg) {
    svgEl('rect', {
        x: CANARIAS_BOX.x, y: CANARIAS_BOX.y,
        width: CANARIAS_BOX.w, height: CANARIAS_BOX.h, rx: 6,
        fill: 'rgba(255,255,255,0.02)',
        stroke: 'rgba(255,255,255,0.18)',
        'stroke-width': 0.8,
        'stroke-dasharray': '3,3',
    }, svg);
    const label = svgEl('text', {
        x: CANARIAS_BOX.x + CANARIAS_BOX.w / 2,
        y: CANARIAS_BOX.y + 8,
        'text-anchor': 'middle',
        fill: 'rgba(255,255,255,0.35)',
        'font-size': '6px',
        'font-family': 'Bungee, sans-serif',
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
    path.addEventListener('click', () => {
        // Pan/pinch gestures synthesize a click on touchend; ignore those.
        if (panZoomController && panZoomController.isClickSuppressed()) return;
        onClick(idx);
    });

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
    drawCanariasInset(svg);

    const canariasGroup = svgEl('g', {
        transform: `translate(${CANARIAS_OFFSET[0]},${CANARIAS_OFFSET[1]})`,
    }, svg);

    provincesData.length = 0;
    const mainlandPathGen = d3.geoPath().projection(mainland);
    const canariasPathGen = d3.geoPath().projection(canarias);

    mainlandFeatures.forEach(f => renderProvince(f, svg, mainlandPathGen, null, onProvinceClick));
    canariasFeatures.forEach(f => renderProvince(f, canariasGroup, canariasPathGen, CANARIAS_OFFSET, onProvinceClick));

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

    const container = document.getElementById('map-container');
    panZoomController = setupPanZoom(svg, container);
}

// Pinch-to-zoom + pan + wheel-zoom by mutating the SVG viewBox. Keeps all
// existing path / label coordinates intact and lets the player zoom into
// tiny provinces (Madrid, La Rioja, País Vasco) on small screens.
function setupPanZoom(svg, container) {
    const baseW = MAINLAND_VIEWBOX[0];
    const baseH = MAINLAND_VIEWBOX[1];
    const minW = baseW * 0.18; // up to ~5.5x zoom
    let vb = { x: 0, y: 0, w: baseW, h: baseH };

    let pinchStart = null;
    let panStart = null;
    let suppressClickUntil = 0;
    let resetBtn = null;

    function applyVB() {
        svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
        if (resetBtn) {
            resetBtn.classList.toggle('active', vb.w < baseW * 0.995);
        }
    }

    function clamp() {
        if (vb.w > baseW) vb.w = baseW;
        if (vb.w < minW) vb.w = minW;
        vb.h = vb.w * (baseH / baseW);
        if (vb.x < 0) vb.x = 0;
        if (vb.y < 0) vb.y = 0;
        if (vb.x + vb.w > baseW) vb.x = baseW - vb.w;
        if (vb.y + vb.h > baseH) vb.y = baseH - vb.h;
    }

    function reset() {
        vb = { x: 0, y: 0, w: baseW, h: baseH };
        applyVB();
    }

    function clientToSvg(cx, cy) {
        const rect = svg.getBoundingClientRect();
        const sx = (cx - rect.left) / rect.width;
        const sy = (cy - rect.top) / rect.height;
        return {
            x: vb.x + sx * vb.w,
            y: vb.y + sy * vb.h,
            sx, sy,
        };
    }

    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            const [t1, t2] = e.touches;
            const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
            const cx = (t1.clientX + t2.clientX) / 2;
            const cy = (t1.clientY + t2.clientY) / 2;
            const focus = clientToSvg(cx, cy);
            pinchStart = { dist: Math.max(1, dist), focus, w: vb.w };
            panStart = null;
            suppressClickUntil = Date.now() + 600;
            e.preventDefault();
        } else if (e.touches.length === 1) {
            const t = e.touches[0];
            panStart = {
                cx: t.clientX, cy: t.clientY,
                vbx: vb.x, vby: vb.y,
                moved: false,
            };
            pinchStart = null;
        }
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && pinchStart) {
            const [t1, t2] = e.touches;
            const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
            const cx = (t1.clientX + t2.clientX) / 2;
            const cy = (t1.clientY + t2.clientY) / 2;
            const scale = Math.max(0.1, dist / pinchStart.dist);
            vb.w = pinchStart.w / scale;
            clamp();
            const rect = svg.getBoundingClientRect();
            const sxNow = (cx - rect.left) / rect.width;
            const syNow = (cy - rect.top) / rect.height;
            vb.x = pinchStart.focus.x - sxNow * vb.w;
            vb.y = pinchStart.focus.y - syNow * vb.h;
            clamp();
            applyVB();
            suppressClickUntil = Date.now() + 400;
            e.preventDefault();
        } else if (e.touches.length === 1 && panStart) {
            const t = e.touches[0];
            const dx = t.clientX - panStart.cx;
            const dy = t.clientY - panStart.cy;
            if (!panStart.moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
                panStart.moved = true;
            }
            if (panStart.moved && vb.w < baseW) {
                const rect = container.getBoundingClientRect();
                vb.x = panStart.vbx - (dx / rect.width) * vb.w;
                vb.y = panStart.vby - (dy / rect.height) * vb.h;
                clamp();
                applyVB();
                suppressClickUntil = Date.now() + 250;
                e.preventDefault();
            }
        }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
        if (pinchStart || (panStart && panStart.moved)) {
            suppressClickUntil = Date.now() + 250;
        }
        if (e.touches.length === 0) {
            panStart = null;
            pinchStart = null;
        } else if (e.touches.length === 1) {
            // One finger lifted from a pinch — keep the remaining one as a
            // "moved" pan anchor so the residual motion doesn't fire a click.
            const t = e.touches[0];
            panStart = { cx: t.clientX, cy: t.clientY, vbx: vb.x, vby: vb.y, moved: true };
            pinchStart = null;
        }
    });

    container.addEventListener('wheel', (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        const factor = e.deltaY > 0 ? 1.18 : 1 / 1.18;
        const focus = clientToSvg(e.clientX, e.clientY);
        vb.w *= factor;
        clamp();
        vb.x = focus.x - focus.sx * vb.w;
        vb.y = focus.y - focus.sy * vb.h;
        clamp();
        applyVB();
    }, { passive: false });

    resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'zoom-reset';
    resetBtn.setAttribute('aria-label', 'Restablecer zoom');
    resetBtn.title = 'Restablecer zoom';
    resetBtn.textContent = '⊖';
    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        reset();
    });
    container.appendChild(resetBtn);

    return {
        reset,
        isClickSuppressed: () => Date.now() < suppressClickUntil,
    };
}

function showMapError(message) {
    const titleEl = document.querySelector('#loading .logo-title');
    if (!titleEl) return;
    titleEl.textContent = message;
    titleEl.style.color = 'var(--red)';
    titleEl.style.fontSize = '16px';
}
