// Persistent state in localStorage: per-province miss counter that drives the
// "Revancha de Fallos" mode. Trophies reset to 0 on every page load by design.

const TROPHIES_KEY = 'brawl_trophies';
const MISTAKES_KEY = 'brawl_mistakes';

localStorage.removeItem(TROPHIES_KEY);

function loadTrophies() {
    return 0;
}

function loadMistakes() {
    try {
        return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '{}');
    } catch (e) {
        return {};
    }
}

function saveProgress(trophies, mistakes) {
    localStorage.setItem(TROPHIES_KEY, String(trophies));
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
}
