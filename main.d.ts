export interface RunInteractivelyOptions {
  env?: Record<string, string>,
  spawnO?: object,
  verbosity?: number,
  rejectOnError?: boolean,
}

/**
 * Spawns a command as a child process, with interactive stdio.
 * @returns Promise<number> Resolves/rejects with exit code.
 */
export declare function runInteractivelyP(
  cmd: string,
  argsA?: string[],
  optionsO?: RunInteractivelyOptions
): Promise<number>;
