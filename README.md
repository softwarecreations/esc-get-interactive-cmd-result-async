
# esc-get-interactive-cmd-result-async

Run any terminal command fully interactively from Node.js. Inherit stdio so the user can interact live—perfect for editors, shells, debuggers, installers, prompts, and more.

- Pure, dependency-free
- Promisified, simple API
- All stdio is **live**—for full interactive experience
- Output & input visible to user, as if run from your shell

## My other NPM modules for capturing output from passive commands

### Capture stdout or get custom arrays on error afterwards

[esc-get-cmd-stdout-array-promise](https://www.npmjs.com/package/esc-get-cmd-stdout-array-promise)

### Capture std out/err with optional advanced easy capture/filtering, error handling, live output passthru

[esc-get-cmd-data-passthru-async](https://www.npmjs.com/package/esc-get-cmd-data-passthru-async)

---

## Install

```sh
npm install esc-get-interactive-cmd-result-async
```

---

## Usage

Run a command such as `nano`, `bash`, `less`, or anything needing live terminal I/O:

```js
import { runInteractivelyP } from 'esc-get-interactive-cmd-result-async';

try {
  // Open nano for the user as if in a regular terminal
  const exitCode = await runInteractivelyP('nano', ['/tmp/foo.txt'], {
    env: { DEBUG: '1' },
    verbosity: 2,           // (0-3), default: 3
    // spawnO: { cwd: '/tmp' } // set custom spawn options if needed
  });
  console.log('Nano closed with exit code', exitCode);
} catch (exitCode) {
  console.error('Editor closed with error/exit code', exitCode);
}
```

**Any command will run truly interactively—input and output happen live in your terminal.**

---

## API

### `runInteractivelyP(cmd, argsA=[], optionsO={})`

- **cmd**: _String_ – Command to run (e.g. `'bash'`, `'nano'`, `'vim'`)
- **argsA**: _Array&lt;string&gt;_ – Arguments for the command.
- **optionsO**: _Object_
  - **env**:        _Object_ (default: `{}`) – Extra environment variables (merged with `process.env`).
  - **spawnO**:     _Object_ – Extra [`child_process.spawn` options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) (e.g., `{cwd}`)
  - **verbosity**:  _0-3_ (default: 3)
    - 0: silent, 1: errors, 2: show commands, 3: show success
  - **rejectOnError**: _Boolean_ (default: true) – Rejects promise on exit code != 0. If false, always resolves.

#### Returns

A Promise which resolves (**or rejects**) with the exit code.  
- _0 = success_, non-zero = error/failure/other exit

---

## Features

- **No dependencies**
- **100% interactive** I/O stdin/stdout/stderr all passed through
- **Promisified**
- **Live terminal experience**
- **Custom env, cwd, spawn control**
- **Small: Under 2k of code**
- **Stable API**
- **Simple**

---

## Typical Use

- Interactive editors (`nano`, `vim`)
- Running login shells, REPLs, or live CLIs with user prompts
- Running full-screen UIs (e.g., `top`, `htop`)
- Install scripts, password prompts, utilities that require input

---

## License

MIT

---

**Star it:** [esc-get-interactive-cmd-result-async on GitHub](https://github.com/softwarecreations/esc-get-interactive-cmd-result-async)  
**Issues & PRs welcome!**

---
