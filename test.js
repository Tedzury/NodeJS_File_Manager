import { resolve } from 'path';
import { stat } from 'fs/promises';
import getRootDir from './src/helpers/getRootDir.js';

const inputString1 = './some very important asdsaf ';
const inputString2 = '\'some very important\' asdsaf ';
const inputString3 = 'some very important "./asdsaf"';
const inputString4 = './some/very/important "some dir"';
const inputString5 = 'src';
const inputString6 = '\'asd asdsad\' asdsad'

// const normalizeArgs = (inputString) => inputString
//   .replaceAll('"', '\'')
//   .replaceAll('`', '\'')
//   .split('\'')
//   .map(item => item.replaceAll('\'', ''))
//   .filter(item => item)
//   .filter(item => item !== ' ');

// const testFunc = (_inputStr) => {
//   const outPut = [];
//   let characters = [];
//   let isQouteOpened = false;
//   const unifiedQoutes = _inputStr
//     .replaceAll('"', '\'')
//     .replaceAll('`', '\'');
//   for (const char of unifiedQoutes) {
//     if (char === '\'' && !isQouteOpened) {
//       isQouteOpened = true;
//     } else if (char === '\'' && isQouteOpened) {
//       isQouteOpened = false;
//     } else if (char === ' ' && !isQouteOpened) {
//       outPut.push(characters.join(''));
//       characters = [];
//     } else if (char === ' ' && isQouteOpened) {
//       characters.push(char);
//     } else {
//       characters.push(char)
//     }
//   }
//   if (characters.length > 0) outPut.push(characters.join(''));
//   return outPut;
// };

// console.log(testFunc(inputString1));
// console.log(testFunc(inputString2));
// console.log(testFunc(inputString3));
// console.log(testFunc(inputString4));
// console.log(testFunc(inputString5));
// console.log(testFunc(inputString6));

// console.log(normalizeArgs(inputString1));
// console.log(normalizeArgs(inputString2));
// console.log(normalizeArgs(inputString3));


const func = async () => {
  const filePath = resolve(getRootDir(import.meta.url), 'src', 'testFiles', 'archive.gz');
  const info = (await stat(filePath)).isDirectory();
  console.log(info);
}

func();
