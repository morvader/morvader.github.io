// Builds the Spain SVG map from TopoJSON: mainland + Baleares are projected
// together; the Canary Islands are projected separately and dropped into an
// inset box in the bottom-left corner.

const MAINLAND_VIEWBOX = [750, 650];
const CANARIAS_OFFSET = [15, 548];
const CANARIAS_BOX = { x: 5, y: 535, w: 165, h: 110 };

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
        fill: 'rgba(255,255,255,0.02)',
        stroke: 'rgba(255,255,255,0.12)',
        'stroke-width': 0.8,
        'stroke-dasharray': '3,3',
    }, svg);
    const label = svgEl('text', {
        x: 87, y: 548,
        'text-anchor': 'middle',
        fill: 'rgba(255,255,255,0.25)',
        'font-size': '7px',
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
}

function showMapError(message) {
    const titleEl = document.querySelector('#loading .logo-title');
    if (!titleEl) return;
    titleEl.textContent = message;
    titleEl.style.color = 'var(--red)';
    titleEl.style.fontSize = '16px';
}
