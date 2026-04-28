// @ts-check
// Override config: run the same Playwright suite against the published copy
// served by Hugo at http://localhost:1313/games/provincias-espana/play/.
// Hugo must already be running (`hugo server` from repo root). Use:
//   npm run test:blog
// Tests use bare `goto('')` so they resolve against this baseURL (with
// subpath); the same gotos also work against the default http-server config
// because http-server serves index.html at the root.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:1313/games/provincias-espana/play/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
