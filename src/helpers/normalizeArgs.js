const normalizeArgs = (inputString) => {
  const outPut = [];
  let characters = [];
  let isQouteOpened = false;
  const unifiedQoutes = inputString
    .replaceAll('"', '\'')
    .replaceAll('`', '\'');
  for (const char of unifiedQoutes) {
    if (char === '\'' && !isQouteOpened) {
      isQouteOpened = true;
    } else if (char === '\'' && isQouteOpened) {
      isQouteOpened = false;
    } else if (char === ' ' && !isQouteOpened) {
      outPut.push(characters.join(''));
      characters = [];
    } else if (char === ' ' && isQouteOpened) {
      characters.push(char);
    } else {
      characters.push(char)
    }
  }
  if (characters.length > 0) outPut.push(characters.join(''));
  return outPut;
};

export default normalizeArgs;
