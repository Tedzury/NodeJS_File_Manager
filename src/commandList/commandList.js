import osModule from '../osModule/osModule.js';
import navModule from '../navModule/navModule.js';
import filesModule from '../filesModule/filesModule.js';
import hashModule from '../hashModule/hashModule.js';
import zipModule from '../zipModule/zipModule.js';

const initCommandList = (_state) => {
  const navigation = navModule(_state);
  const filesManager = filesModule(_state);
  const hashCalc = hashModule(_state);
  const zipper = zipModule(_state);

  return {
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
};

export default initCommandList;
