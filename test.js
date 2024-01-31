import { resolve } from 'path';
import getRootDir from './src/helpers/getRootDir.js';

const root = getRootDir(import.meta.url);
console.log(resolve(root, '/trulala'))
