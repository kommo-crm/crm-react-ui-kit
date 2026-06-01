import path from 'path';

import svgrPlugin from 'vite-plugin-svgr';

import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { type ReporterDescription } from '@playwright/test';

import { Platform } from './src/lib/platform';
import { Appearance } from './src/lib/appearance';

const DEFAULT_REPORTER: ReporterDescription[] = [
  ['list'],
  ['json', { outputFile: 'e2e-results.json' }],
];

function generateProjects() {
  const appearances = [Appearance.DEFAULT, Appearance.ALTERNATIVE];
  const projects = appearances
    .map((appearance) => [
      {
        name: `android (chromium) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.ANDROID,
          ...devices['Pixel 5'],
        },
      },

      {
        name: `ios (webkit) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.IOS,
          ...devices['iPhone XR'],
        },
      },

      {
        name: `web (chromium) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Chrome'],
        },
      },

      {
        name: `web (firefox) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Firefox'],
        },
      },

      {
        name: `web (webkit) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Safari'],
        },
      },
    ])
    .flat();

  return projects;
}

export default defineConfig({
  testDir: path.join(__dirname, './src'),
  testMatch: '**/*.e2e.test.tsx',

  outputDir: '__diff_output__/',
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/../__image_snapshots__/{arg}{ext}',

  /**
   * Maximum time one test can run for
   */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /**
   * Run tests in files in parallel
   */
  fullyParallel: true,

  /**
   * Fail the build on CI if you accidentally left test.only in the source code
   */
  forbidOnly: Boolean(process.env.CI),
  /**
   * Retry on CI only
   */
  retries: process.env.CI ? 1 : 0,
  /**
   * Limit the number of failures on CI to save resources.
   */
  maxFailures: process.env.CI ? 10 : undefined,

  use: {
    /**
     * Collect trace when retrying the failed test.
     * See https://playwright.dev/docs/trace-viewer
     */
    trace: 'on-first-retry',

    deviceScaleFactor: 1,

    ctViteConfig: {
      // @ts-expect-error Invalid svgrPlugin initial typing.
      plugins: [svgrPlugin({ include: '**/*.svg' })],
      resolve: {
        alias: {
          'src': path.resolve(__dirname, './src'),
          '@storybook-utils': path.resolve(__dirname, 'storybook'),
        },
      },
    },
  },

  reporter: process.env.CI
    ? DEFAULT_REPORTER
    : [['html', { open: 'never' }], ...DEFAULT_REPORTER],

  projects: generateProjects(),
});
