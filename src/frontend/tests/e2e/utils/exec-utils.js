import child_process from 'node:child_process';
import util from 'node:util';

const execPromisified = util.promisify(child_process.exec);

export async function execAsync(command, cwd = '.') {
  return execPromisified(command, { cwd: cwd });
}