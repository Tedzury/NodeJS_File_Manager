import InvalidInputError from '../helpers/invalidInputError.js';
import OperationError from '../helpers/operationError.js';
import { basename, resolve } from 'path';
import { createReadStream, open, createWriteStream } from 'fs';
import { rename as myRename, access, stat, rm } from 'fs/promises'

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
  };
  const copy = async (_args) => {
    const [srcFileArg, destDirArg] = _args;
    if (srcFileArg && destDirArg) {
      const srcFilePath = resolve(_appState.getCurrDir(), srcFileArg);
      const destDirPath = resolve(_appState.getCurrDir(), destDirArg);
      let isFile;
      let isDir;
      try {
        isFile = (await stat(srcFilePath)).isFile();
        isDir = (await stat(destDirPath)).isDirectory();
      } catch {
        throw new InvalidInputError();
      }
      if (isFile && isDir) {
        const readStream = createReadStream(srcFilePath);
        const writeStream = createWriteStream(resolve(destDirPath, basename(srcFilePath)), { flags: 'wx' });

        readStream.on('error', () => console.log('Operation failed'));
        writeStream.on('error', () => console.log('Operation failed'));

        readStream.pipe(writeStream);
      } else {
        throw new OperationError();
      }
    } else {
      throw new InvalidInputError();
    }
  };
  const remove = async (_arg) => {
    if (!_arg) throw new InvalidInputError();
    const filePath = resolve(_appState.getCurrDir(), _arg);
    try {
      await rm(filePath);
    } catch {
      throw new OperationError();
    }
  };
  const move = async (_args) => {
    await copy(_args);
    await remove(_args[0]);
  };
  return {
    cat: (arg) => cat(arg),
    add: (arg) => add(arg),
    rn: (args) => rename(args),
    cp: (args) => copy(args),
    mv: (args) => move(args),
    rm: (arg) => remove(arg)
  }
};

export default filesModule;
