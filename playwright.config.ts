import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  workers: 2,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    testIdAttribute: 'data-test',
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
