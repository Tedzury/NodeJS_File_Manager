import { createInterface } from 'readline/promises';
import getUserName from './helpers/getUserName.js';
import OperationError from './helpers/operationError.js';
import parseArgs from './helpers/parseArgs.js';
import osModule from './osModule/osModule.js';

const CommandsList = {
  '.exit': () => process.exit(),
  os: (argsArr) => osModule(argsArr)
}

const replInputHandler = (_process, _state) => async (line) => {
  const [command, ...args] = parseArgs(line);
  try {
    if (Object.hasOwn(CommandsList, command)) {
      await CommandsList[command](args);
    } else {
      throw new OperationError();
    }
  } catch (err) {
    console.log(err.message);
  }
};

const readlineModule = (_process, _state, _inputHandler) => {
  const readline = createInterface({ input: _process.stdin, output: _process.stdout });
  readline.on('line', async (line) => {
    await _inputHandler(line)
    console.log(`You are currently in ${_state._currDirectory}`);
    readline.prompt();
  })
}

const app = () => {
  const appState = {
    _userName: getUserName(process.argv),
    _currDirectory: 'trulala',

    setCurrDir (dir) { this._currDirectory = dir },
    getCurrDir () { return this._currDirectory }
  }
  console.log(`Welcome to the File Manager, ${appState._userName}!`);
  console.log(`You are currently in ${appState._currDirectory}`);

  const handler = replInputHandler(process, appState)
  readlineModule(process, appState, handler)

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${appState._userName}, goodbye!`);
  })
};

export default app;
