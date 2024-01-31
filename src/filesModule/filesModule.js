import InvalidInputError from '../helpers/invalidInputError.js';
import OperationError from '../helpers/operationError.js';
import { resolve } from 'path';
import { createReadStream, open } from 'fs';
import { rename as myRename, access } from 'fs/promises'

const filesModule = (_appState) => {
  const cat = (_arg) => {
    if (!_arg) throw new InvalidInputError();
    const filePath = resolve(_appState.getCurrDir(), _arg);
    createReadStream(filePath, { encoding: 'utf-8' })
      .on('data', (chunk) => {
        console.log(chunk.toString());
      })
      .on('error', () => { console.log('Operation failed') });
  };
  const add = async (_arg) => {
    if (!_arg) throw new InvalidInputError();
    const filePath = resolve(_appState.getCurrDir(), _arg);
    open(filePath, 'wx', (err) => {
      if (err) console.log('Operation failed')
    });
  };
  const rename = async (_args) => {
    const [srcFileArg, destFileArg] = _args;
    if (srcFileArg && destFileArg) {
      const srcFilePath = resolve(_appState.getCurrDir(), srcFileArg);
      const destFilePath = resolve(_appState.getCurrDir(), destFileArg);
      try {
        await access(destFilePath);
        throw new Error('already exists');
      } catch (err) {
        if (err.message === 'already exists') throw new OperationError();
        try {
          await myRename(srcFilePath, destFilePath);
        } catch {
          throw new OperationError()
        }
      }
    } else {
      throw new InvalidInputError();
    }
  }
  return {
    cat: (arg) => cat(arg),
    add: (arg) => add(arg),
    rn: (args) => rename(args),
    cp: (args) => {},
    mv: (args) => {},
    rm: (args) => {}
  }
};

export default filesModule;
