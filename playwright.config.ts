import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  //timeout: 30000,
  retries: 1,
  reporter: [
    ['list'], // Console output
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
  ],
  use: {
    testIdAttribute: 'id',
    headless: true,
    //baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'ict',
      use: { ...devices['Desktop Chrome'] ,
      baseURL: 'https://www.saucedemo.com/',
      },
      retries: 2,
      expect: {
        timeout: 8000
      },
    },
    {
     name: 'sit',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'https://www.saucedemo.com/'},
      retries: 1,
      expect: {
        timeout: 8000
      },
    },
  ],
});