import { execAsync } from './exec-utils';
import dockerConfig from './docker-config.js';

function getFrontendContainerName(dockerSetupInfo) {
  return `${dockerConfig.FRONTEND_IMAGE_NAME}-${dockerSetupInfo.frontendPort}`;
}

function getBackendContainerName(dockerSetupInfo) {
  return `${dockerConfig.BACKEND_IMAGE_NAME}-${dockerSetupInfo.backendPort}`;
}

export async function buildImage(dockerfile, name, context, useCache = true) {
  let cmd = 'docker build';
  if (!useCache) cmd += ' --no-cache';
  cmd += ` -f ${dockerfile} -t ${name} ${context}`;

  await execAsync(cmd, '..');
}

export function runContainers(dockerSetupInfo) {
  const backendContainerName = getBackendContainerName(dockerSetupInfo);
  const backendStart = runContainer(backendContainerName, `-p ${dockerSetupInfo.backendPort}:5000 ${dockerConfig.BACKEND_IMAGE_NAME}`);

  const frontendContainerName = getFrontendContainerName(dockerSetupInfo);
  const frontendStart = runContainer(frontendContainerName, `-p ${dockerSetupInfo.frontendPort}:3000 --env API_URL=http://localhost:${dockerSetupInfo.backendPort} ${dockerConfig.FRONTEND_IMAGE_NAME}`);

  return Promise.all([backendStart, frontendStart]);
}

async function runContainer(name, args) {
  await execAsync(`docker run -d --rm --name ${name} ${args}`);

  let healthStatus;
  do {
    let { stdout } = await execAsync(`docker inspect --format {{.State.Health.Status}} ${name}`);
    healthStatus = stdout.trim();
    if (healthStatus == "unhealthy") {
      throw new Error(`Container ${name} unhealthy, aborting`);
    }
  } while (healthStatus != "healthy")
}

export function removeContainers(dockerSetupInfo) {
  return Promise.all(
    [
      getFrontendContainerName(dockerSetupInfo),
      getBackendContainerName(dockerSetupInfo)
    ].map(removeContainer)
  );
}

async function removeContainer(name) {
  await execAsync(`docker rm -f ${name}`);
}
