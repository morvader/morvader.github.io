// @ts-check
const { test, expect } = require('@playwright/test');

test('partida completa: acertar todas las provincias y llegar a la pantalla de resultados', async ({ page }) => {
  test.setTimeout(180_000);

  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('/index.html');
  await expect(page.locator('#welcome')).toBeVisible();

  await page.getByRole('button', { name: /Todas las Provincias/ }).click();
  await expect(page.locator('#game')).toBeVisible();

  await expect
    .poll(async () => (await page.locator('#question-text').textContent()) || '')
    .toMatch(/¿Dónde está .+\?/);

  const total = await page.evaluate(() => {
    const m = document.getElementById('hud-progress').textContent.match(/\d+\/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  });
  expect(total, 'el HUD debe mostrar un total > 0').toBeGreaterThan(0);
  console.log(`[full-game] total provincias en la partida: ${total}`);

  const askedNames = [];

  for (let i = 0; i < total; i++) {
    const currentText = await page.locator('#question-text').textContent();
    const match = currentText && currentText.match(/¿Dónde está (.+)\?/);
    expect(match, `pregunta inválida en turno ${i + 1}: "${currentText}"`).not.toBeNull();
    const name = match[1];
    askedNames.push(name);

    const exists = await page.evaluate((n) => {
      return !!document.querySelector(`path[data-name="${CSS.escape(n)}"]`);
    }, name);
    expect(exists, `no existe path[data-name="${name}"] en el SVG`).toBe(true);

    await page.evaluate((n) => {
      const p = document.querySelector(`path[data-name="${CSS.escape(n)}"]`);
      p.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }, name);

    if (i < total - 1) {
      await page.waitForFunction(
        (prev) => {
          const t = document.getElementById('question-text').textContent;
          const m = t && t.match(/¿Dónde está (.+)\?/);
          return m && m[1] !== prev;
        },
        name,
        { timeout: 5000 }
      );
    } else {
      await expect(page.locator('#results')).toBeVisible({ timeout: 5000 });
    }
  }

  // Comprobaciones finales sobre la pantalla de resultados
  await expect(page.locator('#results')).toBeVisible();
  await expect(page.locator('#game')).toBeHidden();
  await expect(page.locator('#stat-correct')).toHaveText(String(total));
  await expect(page.locator('#stat-wrong')).toHaveText('0');
  await expect(page.locator('#stat-streak')).toHaveText(String(total));

  const uniqueAsked = new Set(askedNames);
  expect(uniqueAsked.size, 'cada provincia debe preguntarse una sola vez en una partida sin fallos').toBe(total);

  expect(consoleErrors, `Errores en consola:\n${consoleErrors.join('\n')}`).toEqual([]);
});
