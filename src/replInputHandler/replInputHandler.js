import parseArgs from '../helpers/parseArgs.js';
import NoCommandError from '../helpers/noCommandError.js';

const replInputHandler = (_process, _state, _commandsList) => async (line) => {
  const [command, ...args] = parseArgs(line);
  try {
    if (Object.hasOwn(_commandsList, command)) {
      await _commandsList[command](args);
    } else {
      throw new NoCommandError();
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default replInputHandler;
