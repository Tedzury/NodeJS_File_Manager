import InvalidInputError from '../helpers/invalidInputError.js';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

const zipModule = (_appState) => {
  const compress = (_args) => {
    const [srcFileArg, destFileArg] = _args;
    if (srcFileArg && destFileArg) {
      const srcFile = resolve(_appState.getCurrDir(), srcFileArg);
      const destFile = resolve(_appState.getCurrDir(), destFileArg);
      const readable = createReadStream(srcFile);
      const zipper = createBrotliCompress();
      const writable = createWriteStream(destFile);
      readable.on('error', () => console.log('Operation failed'));
      zipper.on('error', () => console.log('Operation failed'));
      writable.on('error', () => console.log('Operation failed'));
      pipeline(
        readable,
        zipper,
        writable
      );
    } else {
      throw new InvalidInputError();
    }
  }

  const decompress = (_args) => {
    const [srcFileArg, destFileArg] = _args;
    if (srcFileArg && destFileArg) {
      const srcFile = resolve(_appState.getCurrDir(), srcFileArg);
      const destFile = resolve(_appState.getCurrDir(), destFileArg);
      const readable = createReadStream(srcFile);
      const zipper = createBrotliDecompress();
      const writable = createWriteStream(destFile);
      readable.on('error', () => console.log('Operation failed'));
      zipper.on('error', () => console.log('Operation failed'));
      writable.on('error', () => console.log('Operation failed'));
      pipeline(
        readable,
        zipper,
        writable
      );
    } else {
      throw new InvalidInputError();
    }
  }

  return {
    compress: (args) => compress(args),
    decompress: (args) => decompress(args)
  }
};

export default zipModule;
