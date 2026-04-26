// Tiny WebAudio sound effects. Lazily initialised because browsers require a
// user gesture before the audio context can resume.

let audioCtx;

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playTone(ctx, freq, type, durationMs, gainStart, startOffsetMs = 0) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = gainStart;
    osc.frequency.value = freq;
    osc.type = type;
    const startAt = ctx.currentTime + startOffsetMs / 1000;
    const stopAt = startAt + durationMs / 1000;
    gain.gain.exponentialRampToValueAtTime(0.001, stopAt);
    osc.start(startAt);
    osc.stop(stopAt);
}

function playSound(type) {
    try {
        const ctx = getAudioCtx();
        if (type === 'correct') {
            playTone(ctx, 523, 'triangle', 250, 0.12);
            setTimeout(() => playTone(ctx, 659, 'triangle', 250, 0.12), 100);
        } else if (type === 'wrong') {
            playTone(ctx, 185, 'sawtooth', 350, 0.12);
        } else if (type === 'victory') {
            [523, 587, 659, 784].forEach((freq, i) => {
                playTone(ctx, freq, 'triangle', 300, 0.1, i * 150);
            });
        }
    } catch (e) {
        // Audio is best-effort; silently ignore failures.
    }
}
