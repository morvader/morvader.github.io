// Core game loop: queue of provinces to ask, click handling, scoring,
// timed-mode countdown, and final results.
//
// IMPORTANT INVARIANT — `gameState.current` must be cleared as soon as a click
// has been *processed* (correct or wrong). The DOM transitions and the
// follow-up `nextQuestion` are scheduled via setTimeout, so without clearing
// `current` a fast second click during the feedback window would treat the
// already-answered province as the "wrong" pick and push it back into the
// queue. That eventually resurfaces an answered province as the next question,
// and since `answered.has(idx)` short-circuits all further clicks, the game
// becomes impossible to advance — which is exactly the "stuck on the last
// province" bug we are fixing.

const TROPHY_BASE = 10;
const TROPHY_STREAK_BONUS = 5;
const TROPHY_STREAK_CAP = 5;
const TROPHY_LOSS = 5;
const TIMED_DURATION_S = 30;
const FEEDBACK_DELAY_CORRECT_MS = 700;
const FEEDBACK_DELAY_WRONG_MS = 1800;
const FEEDBACK_DELAY_SKIP_MS = 250;

let totalTrophies = loadTrophies();
let mistakeHistory = loadMistakes();
let gameState = null;
let timerInterval = null;
let lastMode = 'all';
let selectedCommunities = new Set();

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function persist() {
    saveProgress(totalTrophies, mistakeHistory);
}

function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function buildIndices(mode) {
    if (mode === 'mistakes') {
        const mistakeNames = Object.keys(mistakeHistory).filter(k => mistakeHistory[k] > 0);
        if (mistakeNames.length === 0) {
            alert('¡No tienes fallos, Guille! ¡Eres un crack! 💪🌵');
            return null;
        }
        return provincesData
            .map((_, i) => i)
            .filter(i => mistakeNames.includes(provincesData[i].name));
    }
    if (mode === 'community') {
        const indices = provincesData
            .map((_, i) => i)
            .filter(i => selectedCommunities.has(provincesData[i].community));
        if (indices.length === 0) {
            alert('¡Selecciona al menos una comunidad!');
            return null;
        }
        return indices;
    }
    return provincesData.map((_, i) => i);
}

function resetMapVisuals() {
    document.querySelectorAll('.province-path').forEach(el => {
        el.classList.remove('correct', 'wrong', 'highlight', 'completed');
    });
    document.querySelectorAll('.province-label').forEach(el => el.classList.remove('visible'));
}

function startGame(mode) {
    try { getAudioCtx().resume(); } catch (e) { /* ignored */ }
    lastMode = mode;
    clearTimer();

    const rawIndices = buildIndices(mode);
    if (!rawIndices) return;
    const indices = shuffleArray(rawIndices);

    gameState = {
        mode,
        queue: [...indices],
        current: null,
        correct: 0,
        wrong: 0,
        streak: 0,
        maxStreak: 0,
        sessionTrophies: 0,
        answered: new Set(),
        wrongThisSession: {},
        timed: mode === 'timed',
        timeLeft: TIMED_DURATION_S,
        total: indices.length,
    };

    resetMapVisuals();
    showScreen('game');
    document.getElementById('hud-score').textContent = '0';
    document.getElementById('hud-streak').textContent = '🔥 0';
    document.getElementById('hud-progress').textContent = `0/${gameState.total}`;

    const timerBar = document.getElementById('timer-bar');
    if (gameState.timed) {
        timerBar.style.display = 'block';
        startTimer();
    } else {
        timerBar.style.display = 'none';
    }

    nextQuestion();
}

function nextQuestion() {
    if (!gameState) return;
    if (gameState.queue.length === 0) {
        endGame();
        return;
    }

    gameState.current = gameState.queue.shift();
    const prov = provincesData[gameState.current];

    document.getElementById('question-text').textContent = `¿Dónde está ${prov.name}?`;
    document.getElementById('question-hint').textContent = COMMUNITY_HINTS[prov.community] || prov.community;
    document.getElementById('hud-progress').textContent = `${gameState.answered.size}/${gameState.total}`;
}

function computeTrophyGain(streak) {
    return TROPHY_BASE + Math.min(streak - 1, TROPHY_STREAK_CAP) * TROPHY_STREAK_BONUS;
}

function feedbackForStreak(streak) {
    if (streak >= 5) return `¡${streak}x IMPARABLE! 🔥🔥`;
    if (streak >= 3) return `¡${streak}x RACHA! 🔥`;
    const msgs = ['¡ACIERTO!', '¡BIEN!', '¡CRACK!', '¡TOMA!', '¡OLÉ!'];
    return msgs[Math.floor(Math.random() * msgs.length)] + ' ✓';
}

function handleCorrect(idx) {
    playSound('correct');
    gameState.correct++;
    gameState.streak++;
    if (gameState.streak > gameState.maxStreak) gameState.maxStreak = gameState.streak;

    const gain = computeTrophyGain(gameState.streak);
    gameState.sessionTrophies += gain;
    totalTrophies += gain;

    gameState.answered.add(idx);

    const path = document.querySelector(`[data-idx="${idx}"]`);
    if (path) path.classList.add('correct', 'completed');
    const label = document.querySelector(`[data-label-idx="${idx}"]`);
    if (label) label.classList.add('visible');

    document.getElementById('hud-score').textContent = gameState.sessionTrophies;
    document.getElementById('hud-streak').textContent = `🔥 ${gameState.streak}`;

    showFeedback(feedbackForStreak(gameState.streak), 'var(--green)');

    const correctName = provincesData[idx].name;
    if (mistakeHistory[correctName]) {
        mistakeHistory[correctName] = Math.max(0, mistakeHistory[correctName] - 1);
    }
}

function handleWrong(clickedIdx, currentIdx) {
    playSound('wrong');
    gameState.wrong++;
    gameState.streak = 0;

    gameState.sessionTrophies = Math.max(0, gameState.sessionTrophies - TROPHY_LOSS);
    totalTrophies = Math.max(0, totalTrophies - TROPHY_LOSS);

    const correctName = provincesData[currentIdx].name;
    mistakeHistory[correctName] = (mistakeHistory[correctName] || 0) + 1;
    gameState.wrongThisSession[correctName] = (gameState.wrongThisSession[correctName] || 0) + 1;

    // Re-add the (still unanswered) correct province to the queue.
    gameState.queue.push(currentIdx);

    const wrongPath = document.querySelector(`[data-idx="${clickedIdx}"]`);
    if (wrongPath) {
        wrongPath.classList.add('wrong');
        setTimeout(() => wrongPath.classList.remove('wrong'), 500);
    }

    const correctPath = document.querySelector(`[data-idx="${currentIdx}"]`);
    if (correctPath) {
        correctPath.classList.add('highlight');
        setTimeout(() => correctPath.classList.remove('highlight'), 1800);
    }

    showFeedback(`¡Era ${correctName}!`, 'var(--red)');

    document.getElementById('hud-score').textContent = gameState.sessionTrophies;
    document.getElementById('hud-streak').textContent = '🔥 0';
}

function onProvinceClick(idx) {
    if (!gameState || gameState.current === null) return;
    if (gameState.answered.has(idx)) return;

    const currentIdx = gameState.current;
    // Clear `current` immediately so a stray click during the feedback window
    // can't be processed as a wrong answer for an already-resolved question.
    gameState.current = null;

    if (idx === currentIdx) {
        handleCorrect(idx);
        setTimeout(nextQuestion, FEEDBACK_DELAY_CORRECT_MS);
    } else {
        handleWrong(idx, currentIdx);
        setTimeout(nextQuestion, FEEDBACK_DELAY_WRONG_MS);
    }

    persist();
}

function skipProvince() {
    if (!gameState || gameState.current === null) return;
    gameState.queue.push(gameState.current);
    gameState.current = null;
    showFeedback('⏭️', 'var(--gray)');
    setTimeout(nextQuestion, FEEDBACK_DELAY_SKIP_MS);
}

function startTimer() {
    gameState.timeLeft = TIMED_DURATION_S;
    document.getElementById('timer-fill').style.width = '100%';
    timerInterval = setInterval(() => {
        if (!gameState) { clearTimer(); return; }
        gameState.timeLeft -= 0.1;
        const pct = Math.max(0, (gameState.timeLeft / TIMED_DURATION_S) * 100);
        document.getElementById('timer-fill').style.width = pct + '%';
        if (gameState.timeLeft <= 0) {
            clearTimer();
            endGame();
        }
    }, 100);
}

function endGame() {
    clearTimer();
    if (!gameState) return;
    const gs = gameState;
    gameState = null;
    persist();

    const accuracy = gs.total > 0 ? gs.correct / gs.total : 0;
    let title, spikeMsg, titleColor;

    if (accuracy >= 0.9) {
        title = '¡VICTORIA ÉPICA!';
        titleColor = 'var(--yellow)';
        playSound('victory');
        spawnConfetti();
        spikeMsg = randomMsg(SPIKE_MESSAGES.goodResult);
    } else if (accuracy >= 0.6) {
        title = '¡BUEN COMBATE!';
        titleColor = 'var(--blue)';
        playSound('victory');
        spikeMsg = randomMsg(SPIKE_MESSAGES.okResult);
    } else {
        title = '¡A ENTRENAR!';
        titleColor = 'var(--red)';
        spikeMsg = randomMsg(SPIKE_MESSAGES.badResult);
    }

    const titleEl = document.getElementById('results-title');
    titleEl.textContent = title;
    titleEl.style.color = titleColor;

    document.getElementById('stat-trophies').textContent = '+' + gs.sessionTrophies;
    document.getElementById('stat-correct').textContent = gs.correct;
    document.getElementById('stat-wrong').textContent = gs.wrong;
    document.getElementById('stat-streak').textContent = gs.maxStreak;

    document.getElementById('spike-results-text').textContent = spikeMsg;
    document.getElementById('spike-results-msg').style.display = 'flex';

    renderWrongList(gs.wrongThisSession);

    updateWelcomeScreen(totalTrophies, mistakeHistory);
    showScreen('results');
}

function renderWrongList(wrongMap) {
    const wrongNames = Object.keys(wrongMap);
    const container = document.getElementById('wrong-list-container');
    const list = document.getElementById('wrong-list');
    list.innerHTML = '';

    if (wrongNames.length === 0) {
        container.style.display = 'none';
        document.getElementById('btn-mistakes-results').style.display = 'none';
        return;
    }

    container.style.display = 'block';
    wrongNames
        .sort((a, b) => wrongMap[b] - wrongMap[a])
        .forEach(name => {
            const item = document.createElement('div');
            item.className = 'wrong-item';
            item.innerHTML = `<span>${name}</span><span style="color:var(--red)">${wrongMap[name]}×</span>`;
            list.appendChild(item);
        });
    document.getElementById('btn-mistakes-results').style.display = 'block';
}

function showCommunitySelect() {
    const container = document.getElementById('community-chips');
    container.innerHTML = '';
    selectedCommunities.clear();

    const communities = [...new Set(provincesData.map(p => p.community))].sort();
    communities.forEach(comm => {
        const chip = document.createElement('div');
        chip.className = 'filter-chip';
        chip.textContent = comm;
        chip.addEventListener('click', () => {
            if (selectedCommunities.has(comm)) {
                selectedCommunities.delete(comm);
                chip.classList.remove('active');
            } else {
                selectedCommunities.add(comm);
                chip.classList.add('active');
            }
        });
        container.appendChild(chip);
    });
    showScreen('community-select');
}

function startCommunityGame() {
    if (selectedCommunities.size === 0) {
        alert('¡Selecciona al menos una comunidad!');
        return;
    }
    startGame('community');
}

function replayLastMode() {
    startGame(lastMode);
}
