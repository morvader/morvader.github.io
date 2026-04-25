// @ts-check
const { test, expect } = require('@playwright/test');

// Reproduces the "stuck on completion" bug.
//
// The original game stored the active question in `gameState.current` and only
// cleared it when the next question was loaded ~700ms later. Clicking a second
// (still-unanswered) province during that feedback window was treated as a
// wrong answer for the *already-resolved* current province, which pushed an
// answered idx back into the queue. When that idx eventually surfaced as the
// new question, no click could advance the game (the answered-guard short-
// circuits everything), so the player got stuck — most visibly when finishing
// "Todas las Provincias".
//
// This test fires two clicks back-to-back without waiting for the feedback
// animation, then plays through every province. The game should still reach
// the results screen.
test('clicar rápido durante el feedback no bloquea el juego al completar', async ({ page }) => {
  test.setTimeout(180_000);

  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('/index.html');
  await page.getByRole('button', { name: /Todas las Provincias/ }).click();
  await expect(page.locator('#game')).toBeVisible();

  await expect
    .poll(async () => (await page.locator('#question-text').textContent()) || '')
    .toMatch(/¿Dónde está .+\?/);

  const total = await page.evaluate(() => {
    const m = document.getElementById('hud-progress').textContent.match(/\d+\/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  });
  expect(total).toBeGreaterThan(0);

  const seen = new Set();
  let safety = 0;

  while (seen.size < total && safety++ < total * 3) {
    const text = await page.locator('#question-text').textContent();
    const match = text && text.match(/¿Dónde está (.+)\?/);
    if (!match) {
      await page.waitForTimeout(50);
      continue;
    }
    const correct = match[1];

    // First few turns: dispatch correct + a stray click on another province
    // synchronously, before the feedback timeout runs. The stray click should
    // be ignored, not push the answered province back into the queue.
    if (seen.size < 3) {
      await page.evaluate((name) => {
        const correctEl = document.querySelector(`path[data-name="${CSS.escape(name)}"]`);
        const others = Array.from(document.querySelectorAll('path[data-name]'))
          .filter(p => p.getAttribute('data-name') !== name);
        const stray = others[0];
        correctEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        if (stray) stray.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }, correct);
    } else {
      await page.evaluate((name) => {
        const el = document.querySelector(`path[data-name="${CSS.escape(name)}"]`);
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }, correct);
    }

    seen.add(correct);

    // Wait until question changes or results screen appears.
    await page
      .waitForFunction(
        (prev) => {
          if (document.getElementById('results').classList.contains('active')) return true;
          const t = document.getElementById('question-text').textContent;
          const m = t && t.match(/¿Dónde está (.+)\?/);
          return !!(m && m[1] !== prev);
        },
        correct,
        { timeout: 8000 }
      );
  }

  await expect(page.locator('#results')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('#stat-correct')).toHaveText(String(total));
  expect(consoleErrors, `Errores en consola:\n${consoleErrors.join('\n')}`).toEqual([]);
});
