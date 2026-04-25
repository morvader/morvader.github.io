// @ts-check
const { test, expect } = require('@playwright/test');

test('la pantalla de bienvenida carga sin errores', async ({ page }) => {
  const consoleErrors = [];
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('/index.html');

  await expect(page).toHaveTitle(/Brawl Provincias/);
  await expect(page.locator('#welcome')).toBeVisible();
  await expect(page.getByRole('button', { name: /Todas las Provincias/ })).toBeVisible();

  expect(consoleErrors, `Errores en consola:\n${consoleErrors.join('\n')}`).toEqual([]);
});

test('al iniciar partida se muestra el mapa SVG con provincias', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByRole('button', { name: /Todas las Provincias/ }).click();

  await expect(page.locator('#game')).toBeVisible();
  await expect(page.locator('#map-svg')).toBeVisible();
  await expect.poll(
    async () => page.locator('#map-svg path').count(),
    { timeout: 10000 }
  ).toBeGreaterThan(40);
  await expect(page.locator('#question-text')).not.toHaveText('¿Dónde está...?');
});
