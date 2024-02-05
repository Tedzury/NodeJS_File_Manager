import InvalidInputError from '../helpers/invalidInputError.js';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { stat } from 'fs/promises';
import OperationError from '../helpers/operationError.js';

const zipModule = (_appState) => {
  const compress = async (_args) => {
    const [srcFileArg, destFileArg] = _args;
    if (srcFileArg && destFileArg) {
      try {
        const srcFile = resolve(_appState.getCurrDir(), srcFileArg);
        const destFile = resolve(_appState.getCurrDir(), destFileArg);
        const doesSrcExists = (await stat(srcFile)).isFile();
        if (doesSrcExists) {
          const readable = createReadStream(srcFile);
          const zipper = createBrotliCompress();
          const writable = createWriteStream(destFile);
          await pipeline(
            readable,
            zipper,
            writable
          );
        } else {
          throw new OperationError();
        }
      } catch {
        console.log('Operation failed');
      }
    } else {
      throw new InvalidInputError();
    }
  }

  const decompress = async (_args) => {
    const [srcFileArg, destFileArg] = _args;
    if (srcFileArg && destFileArg) {
      try {
        const srcFile = resolve(_appState.getCurrDir(), srcFileArg);
        const destFile = resolve(_appState.getCurrDir(), destFileArg);
        const doesSrcExists = (await stat(srcFile)).isFile();
        if (doesSrcExists) {
          const readable = createReadStream(srcFile);
          const zipper = createBrotliDecompress();
          const writable = createWriteStream(destFile);
          await pipeline(
            readable,
            zipper,
            writable
          );
        } else {
          throw new OperationError();
        }
      } catch {
        console.log('Operation failed')
      }
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
