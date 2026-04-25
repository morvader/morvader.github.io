// DOM helpers: screen navigation, transient feedback, confetti, welcome HUD.

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs, parent) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    }
    if (parent) parent.appendChild(el);
    return el;
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showFeedback(text, color) {
    const el = document.getElementById('feedback-overlay');
    el.textContent = text;
    el.style.color = color;
    el.classList.remove('show');
    // Force a reflow so the animation restarts even on consecutive calls.
    void el.offsetWidth;
    el.classList.add('show');
}

function spawnConfetti() {
    const c = document.getElementById('confetti-container');
    c.innerHTML = '';
    const colors = ['#ffc800', '#ff4655', '#44dd55', '#4dabf7', '#b197fc', '#ff922b'];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = Math.random() * 100 + '%';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = Math.random() * 0.5 + 's';
        p.style.animationDuration = (1.5 + Math.random()) + 's';
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        const size = 6 + Math.random() * 8;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        c.appendChild(p);
    }
    setTimeout(() => c.innerHTML = '', 3000);
}

function updateWelcomeScreen(trophies, mistakes) {
    document.getElementById('total-trophies').textContent = trophies;

    const rank = getRank(trophies);
    const rankEl = document.getElementById('rank-display');
    rankEl.textContent = rank.name;
    rankEl.style.background = rank.bg;
    rankEl.style.color = rank.color;
    rankEl.style.border = `2px solid ${rank.color}`;

    const hasMistakes = Object.values(mistakes).some(v => v > 0);
    document.getElementById('btn-mistakes').style.display = hasMistakes ? 'block' : 'none';

    const msgEl = document.getElementById('spike-welcome-msg');
    document.getElementById('spike-msg-text').textContent = randomMsg(SPIKE_MESSAGES.welcome);
    msgEl.style.display = 'flex';
}
