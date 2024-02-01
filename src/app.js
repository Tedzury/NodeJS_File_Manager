import readlineModule from './readlineModule/readlineModule.js';
import getUserName from './helpers/getUserName.js';
import getRootDir from './helpers/getRootDir.js';
import replInputHandler from './replInputHandler/replInputHandler.js';
import initCommandList from './commandList/commandList.js';

const app = () => {
  const appState = {
    _userName: getUserName(process.argv),
    _currDirectory: getRootDir(import.meta.url),

    setCurrDir (dir) { this._currDirectory = dir },
    getCurrDir () { return this._currDirectory },
    getUserName () { return this._userName }
  }
  console.log(`Welcome to the File Manager, ${appState.getUserName()}!`);
  console.log(`You are currently in ${appState.getCurrDir()}`);

  const commandList = initCommandList(appState);
  const handler = replInputHandler(commandList)
  readlineModule(process, appState, handler)

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${appState.getUserName()}, goodbye!`);
  })
};

export default app;
