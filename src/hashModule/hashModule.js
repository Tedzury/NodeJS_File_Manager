import InvalidInputError from '../helpers/invalidInputError.js';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { stdout } from 'process';
import { createReadStream } from 'fs';
import { Transform, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { stat } from 'fs/promises';

const hashModule = (_appState) => async (_arg) => {

  if (!_arg) throw new InvalidInputError();

  const filePath = resolve(_appState.getCurrDir(), _arg);
  try {
    const doesExist = (await stat(filePath)).isFile();
    if (doesExist) {
      const readable = createReadStream(filePath, 'utf-8');
      const transform = new Transform({
        transform (chunk, _, cb) {
          const output = createHash('sha256').update(chunk).digest('hex');
          cb(null, output);
        }
      })
      const writable = new Writable({
        write (chunk, _, cb) {
          stdout.write(chunk)
          cb()
        }
      })

      readable.on('error', () => console.log('Operation failed'));
      transform.on('error', () => console.log('Operation failed'));
      writable.on('error', () => console.log('Operation failed'));

      pipeline(
        readable,
        transform,
        writable
      )
    } else {
      throw new InvalidInputError();
    }
  } catch {
    console.log('Operation failed');
  }

};

export default hashModule;
