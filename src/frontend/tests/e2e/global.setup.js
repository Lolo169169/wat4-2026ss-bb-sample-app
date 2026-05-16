import { test as setup } from '@playwright/test';
import { buildImage } from './utils/docker-utils';
import dockerConfig from './utils/docker-config.js';

setup('build docker images', async ({ }) => {
  console.log('[BEGIN] building docker images');

  console.log(`building image ${dockerConfig.BACKEND_IMAGE_NAME} ...`);
  await buildImage(`${dockerConfig.BACKEND_DIR}/e2e.Dockerfile`, dockerConfig.BACKEND_IMAGE_NAME, dockerConfig.BACKEND_DIR)

  console.log(`building image ${dockerConfig.FRONTEND_IMAGE_NAME} ...`);
  await buildImage(`${dockerConfig.FRONTEND_DIR}/e2e.Dockerfile`, dockerConfig.FRONTEND_IMAGE_NAME, dockerConfig.FRONTEND_DIR)

  console.log('[END] building docker images');
});
