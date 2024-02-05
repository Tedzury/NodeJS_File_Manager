import parseArgs from '../helpers/parseArgs.js';
import InvalidInputError from '../helpers/invalidInputError.js';
import normalizeArgs from '../helpers/normalizeArgs.js';

const replInputHandler = (_commandsList) => async (line) => {
  const [command, ...args] = parseArgs(line);
  try {
    if (Object.hasOwn(_commandsList, command)) {
      const normalArgs = normalizeArgs(args.join(' '));
      await _commandsList[command](normalArgs);
    } else {
      throw new InvalidInputError();
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default replInputHandler;
