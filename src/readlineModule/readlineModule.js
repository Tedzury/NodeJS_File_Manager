import { createInterface } from 'readline/promises'

const readlineModule = (_process, _state, _inputHandler) => {
  const readline = createInterface({ input: _process.stdin, output: _process.stdout });
  readline.on('line', async (line) => {
    await _inputHandler(line)
    console.log(`You are currently in ${_state._currDirectory}`);
    readline.prompt();
  })
}

export default readlineModule;
