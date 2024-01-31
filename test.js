import { join, resolve } from 'path';
import { platform } from 'process';
import getRootDir from './src/helpers/getRootDir.js';
import { homedir } from 'os'

const root = getRootDir(import.meta.url);
const moddedRoot = root.split('\\');
console.log(platform);
console.log(homedir())
// console.log(resolve(root, '..', '..', '..', '..', '..', '..', '..'));
console.log(resolve(homedir(), 'trulala', '\\aaaa'))
