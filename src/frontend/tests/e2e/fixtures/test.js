import { test as base } from '@playwright/test';
import { CounterPage } from '../poms/counter-page.js';
import { runContainers, removeContainers } from '../utils/docker-utils.js';

export const test = base.extend({
  counterPage: [async ({ page, dockerSetupInfo }, use) => {
    await runContainers(dockerSetupInfo);
    try {
      const counterPage = new CounterPage(page, dockerSetupInfo);
      await counterPage.waitForCounterValueFetched();
      await use(counterPage);
    } finally {
      await removeContainers(dockerSetupInfo);
    }
  }, { timeout: 2 * 60 * 1_000 }],

  dockerSetupInfo: [async ({ }, use, workerInfo) => {
    const workerIndex = workerInfo.workerIndex;
    const frontendPort = 3300 + workerInfo.workerIndex;
    const backendPort = 5500 + workerInfo.workerIndex;

    await use({ workerIndex, frontendPort, backendPort });
  }, { scope: 'worker' }]
});

export { expect } from '@playwright/test';