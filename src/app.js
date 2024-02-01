import readlineModule from './readlineModule/readlineModule.js';
import getUserName from './helpers/getUserName.js';
import osModule from './osModule/osModule.js';
import getRootDir from './helpers/getRootDir.js';
import replInputHandler from './replInputHandler/replInputHandler.js';
import navModule from './navModule/navModule.js';
import filesModule from './filesModule/filesModule.js';
import hashModule from './hashModule/hashModule.js';
import zipModule from './zipModule/zipModule.js';

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

  const navigation = navModule(appState);
  const filesManager = filesModule(appState);
  const hashCalc = hashModule(appState);
  const zipper = zipModule(appState);

  const commandsList = {
    '.exit': () => process.exit(),
    os: (args) => osModule(args),
    ls: () => navigation.ls(),
    up: () => navigation.cd('..'),
    cd: (args) => navigation.cd(args[0]),
    cat: (args) => filesManager.cat(args[0]),
    add: (args) => filesManager.add(args[0]),
    rn: (args) => filesManager.rn(args),
    cp: (args) => filesManager.cp(args),
    mv: (args) => filesManager.mv(args),
    rm: (args) => filesManager.rm(args[0]),
    hash: (args) => hashCalc(args[0]),
    compress: (args) => zipper.compress(args),
    decompress: (args) => zipper.decompress(args)
  }

  const handler = replInputHandler(process, appState, commandsList)
  readlineModule(process, appState, handler)

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${appState.getUserName()}, goodbye!`);
  })
};

export default app;
