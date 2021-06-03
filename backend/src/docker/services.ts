/** @format */
import { execFile } from 'child_process';
import { promisify } from 'util';
const execShell = promisify(execFile);
const COMMAND = 'docker-compose';

const makeComposeAction = (action: string) => {
  return async (path: string) => {
    try {
      await execShell(COMMAND, [action, '-d'], {
        cwd: path,
      });
      return { success: true, message: null, exitCode: 0 };
    } catch (err) {
      return { success: false, message: err.stderr, exitCode: err.code };
    }  
  };
};

export const restart = makeComposeAction('restart');
export const down = makeComposeAction('down');
export const pause = makeComposeAction('pause');
export const start = makeComposeAction('start');
export const stop = makeComposeAction('stop');
