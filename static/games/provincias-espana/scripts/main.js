// Wires the inline HTML buttons to game/UI handlers and kicks off the map
// build once the DOM is ready.

function bindButtons() {
    document.querySelectorAll('[data-action]').forEach(btn => {
        const action = btn.dataset.action;
        btn.addEventListener('click', () => {
            switch (action) {
                case 'start-all':       return startGame('all');
                case 'start-timed':     return startGame('timed');
                case 'start-mistakes':  return startGame('mistakes');
                case 'start-community': return startCommunityGame();
                case 'show-community':  return showCommunitySelect();
                case 'show-welcome':    return showScreen('welcome');
                case 'replay':          return replayLastMode();
                case 'skip':            return skipProvince();
                case 'end':             return endGame();
            }
        });
    });
}

function init() {
    bindButtons();

    try {
        renderMap(TOPO_DATA, onProvinceClick);
        showScreen('welcome');
        updateWelcomeScreen(totalTrophies, mistakeHistory);
    } catch (err) {
        console.error('Error loading map:', err);
        showMapError('¡Error cargando el mapa!');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
