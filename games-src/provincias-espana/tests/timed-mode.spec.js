// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Lanza el modo contrarreloj y juega hasta que aparezca la pantalla de resultados.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{ wrongFirstN?: number }} opts
 *   wrongFirstN: número de turnos iniciales en los que se elegirá una provincia
 *   distinta de la correcta para forzar fallos.
 * @returns {Promise<{ asked: string[], wronglyAnswered: string[], requeuedAfterMistake: string[] }>}
 */
async function playTimedGame(page, { wrongFirstN = 0 } = {}) {
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('/index.html');
  await expect(page.locator('#welcome')).toBeVisible();

  await page.getByRole('button', { name: /Contrarreloj/ }).click();
  await expect(page.locator('#game')).toBeVisible();
  await expect(page.locator('#timer-bar')).toBeVisible();

  await expect
    .poll(async () => (await page.locator('#question-text').textContent()) || '')
    .toMatch(/¿Dónde está .+\?/);

  const asked = [];
  const wronglyAnswered = [];
  const requeuedAfterMistake = []; // nombres re-encolados detectados tras cada fallo
  let turn = 0;

  while (true) {
    const resultsActive = await page.evaluate(
      () => document.getElementById('results').classList.contains('active')
    );
    if (resultsActive) break;

    const text = await page.locator('#question-text').textContent();
    const match = text && text.match(/¿Dónde está (.+)\?/);
    if (!match) {
      // estamos en transición entre preguntas o el juego acaba de terminar
      await page.waitForTimeout(50);
      continue;
    }
    const correctName = match[1];

    let clickedName;
    if (turn < wrongFirstN) {
      clickedName = await page.evaluate((correct) => {
        const all = Array.from(document.querySelectorAll('path[data-name]'));
        const wrong = all.find((p) => p.getAttribute('data-name') !== correct);
        return wrong ? wrong.getAttribute('data-name') : null;
      }, correctName);
      expect(clickedName, 'debería existir al menos otra provincia para fallar').toBeTruthy();
      wronglyAnswered.push(correctName);
    } else {
      clickedName = correctName;
    }

    asked.push(correctName);

    await page.evaluate((n) => {
      const p = document.querySelector(`path[data-name="${CSS.escape(n)}"]`);
      if (p) p.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }, clickedName);

    // Si era un fallo provocado, leer la cola inmediatamente — gameState sigue vivo
    // durante ~1800 ms hasta el siguiente nextQuestion(). Capturamos los nombres
    // pendientes para confirmar que el fallo se ha re-encolado.
    if (clickedName !== correctName) {
      const queueNames = await page.evaluate(() => {
        // gameState / provincesData están declarados con let/const en scripts
        // clásicos: viven en el ámbito global del documento pero NO en window.
        // eslint-disable-next-line no-undef
        if (typeof gameState === 'undefined' || gameState === null) return null;
        // eslint-disable-next-line no-undef
        return gameState.queue.map((i) => provincesData[i].name);
      });
      if (queueNames && queueNames.includes(correctName)) {
        requeuedAfterMistake.push(correctName);
      }
    }

    // Espera a que (a) la pregunta cambie, (b) aparezca #results, o (c) timeout
    await page
      .waitForFunction(
        (prev) => {
          if (document.getElementById('results').classList.contains('active')) return true;
          const t = document.getElementById('question-text').textContent;
          const m = t && t.match(/¿Dónde está (.+)\?/);
          return !!(m && m[1] !== prev);
        },
        correctName,
        { timeout: 5000 }
      )
      .catch(() => {
        // si llegamos aquí, probablemente el juego ha terminado entre tanto
      });

    turn++;
    if (turn > 200) throw new Error('demasiados turnos — el modo timed debería acabar antes');
  }

  await expect(page.locator('#results')).toBeVisible();
  expect(consoleErrors, `Errores en consola:\n${consoleErrors.join('\n')}`).toEqual([]);

  return { asked, wronglyAnswered, requeuedAfterMistake };
}

test('contrarreloj — todos aciertos: sin fallos cuando el tiempo se agota', async ({ page }) => {
  test.setTimeout(120_000);

  const { asked } = await playTimedGame(page, { wrongFirstN: 0 });

  const correct = parseInt((await page.locator('#stat-correct').textContent()) || '0', 10);
  const wrong = parseInt((await page.locator('#stat-wrong').textContent()) || '-1', 10);
  const streak = parseInt((await page.locator('#stat-streak').textContent()) || '-1', 10);

  console.log(`[timed-clean] asked=${asked.length} correct=${correct} wrong=${wrong} streak=${streak}`);

  expect(wrong, 'no debería haber fallos').toBe(0);
  expect(correct, 'al menos un acierto debería caber en 30s').toBeGreaterThan(0);
  expect(correct).toBe(asked.length);
  expect(streak).toBe(correct);

  // Si la cola se vació, todas las provincias fueron preguntadas; si se agotó el tiempo,
  // el contador correct < total. Cualquiera de los dos finales es válido.
  await expect(page.locator('#results')).toBeVisible();
});

test('contrarreloj — con fallos: las provincias falladas reaparecen y stat-wrong refleja el fallo', async ({ page }) => {
  test.setTimeout(120_000);

  const FAILS = 2;
  const { asked, wronglyAnswered, requeuedAfterMistake } = await playTimedGame(page, { wrongFirstN: FAILS });

  const correct = parseInt((await page.locator('#stat-correct').textContent()) || '0', 10);
  const wrong = parseInt((await page.locator('#stat-wrong').textContent()) || '-1', 10);
  const streak = parseInt((await page.locator('#stat-streak').textContent()) || '-1', 10);

  console.log(`[timed-mistakes] asked=${asked.length} wronglyAnswered=${JSON.stringify(wronglyAnswered)} requeued=${JSON.stringify(requeuedAfterMistake)} correct=${correct} wrong=${wrong} streak=${streak}`);

  expect(wronglyAnswered.length).toBe(FAILS);
  expect(wrong, 'stat-wrong debe coincidir con el número de fallos provocados').toBe(FAILS);
  expect(correct, 'tras los fallos sigue habiendo aciertos').toBeGreaterThan(0);
  // streak (max) no debería contar los fallos iniciales
  expect(streak).toBeLessThanOrEqual(correct);

  // En contrarreloj puede que el tiempo se agote antes de que la fallada vuelva
  // a salir, así que no exigimos que se pregunte de nuevo. Lo que sí debe pasar
  // es que en el momento del fallo la provincia se haya re-encolado.
  for (const name of wronglyAnswered) {
    expect(requeuedAfterMistake, `la provincia fallada "${name}" debería re-encolarse tras el fallo`).toContain(name);
  }

  await expect(page.locator('#results')).toBeVisible();
});
