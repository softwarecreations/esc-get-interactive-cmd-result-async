import { spawn } from 'child_process';

/**
 * Spawns a command as a child process, with interactive stdio.
 *
 * @param {string}                cmd                    - The command to run.
 * @param {Array<string>}         argsA                  - Arguments for the command.
 * @param {Object}                optionsO               - Options object.
 * @param {Object}               [optionsO.env={}]       - Environment variables to override/add.
 * @param {Object}               [optionsO.spawnO={}]    - Additional options for child_process.spawn.
 * @param {number}               [optionsO.verbosity=3]  - Verbosity: 0=silent, 1=errors, 2=commands, 3=success.
 * @param {boolean}              [optionsO.rejectOnError=true] - Reject promise on error or non-zero exit.
 * @returns {Promise<number>}    Promise resolves/rejects with exit code.
 */
export const runInteractivelyP = (
  cmd,
  argsA = [],
  optionsO = {}
) => {
  const { env={}, spawnO={}, verbosity=3, rejectOnError=true } = optionsO;
  const mergedEnvO = { ...process.env, ...env };
  const cmdStr = `${cmd} ${argsA.join(' ')}`;
  if (verbosity >= 2) console.log('Will run', env, cmdStr);

  return new Promise( (resolveF, rejectF) => {
    const errF = rejectOnError ? rejectF : resolveF;
    const child = spawn(cmd, argsA, { stdio:'inherit', ...spawnO, env:mergedEnvO });

    child.on('error', err => {
      if (verbosity >= 1) console.error(`Error running command: ${cmdStr}\n${err.message}`);
      errF(1);
    });
    child.on('exit', code => {
      if (code===0) {
        if (verbosity >= 3) console.log(`The command succeeded: ${cmdStr}`);
        resolveF(0);
      } else {
        if (verbosity >= 1) console.error(`The command failed (code ${code}): ${cmdStr}`);
        errF(code ?? 1);
      }
    });
  });
};

export default runInteractivelyP;
