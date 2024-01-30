import { EOL, arch, cpus, homedir, userInfo } from 'os';
import OperationError from '../helpers/operationError.js';

const possibleOsArgs = {
  '--EOL': () => console.log(`Your system EOL: ${JSON.stringify(EOL)}`),
  '--cpus': () => {
    const cpuList = cpus().map((cpu) => ({
      Model: cpu.model,
      'Clock rate (GHz)': cpu.speed / 1000
    }));
    console.log(`Number of CPUS: ${cpuList.length}`);
    console.table(cpuList);
  },
  '--homedir': () => console.log(`Your home directory: ${homedir()}`),
  '--username': () => console.log(`Your system usermame: ${userInfo().username}`),
  '--architecture': () => console.log(`Your CPU architecture: ${arch()}`)
}

const osModule = (argsArr) => {
  const argument = argsArr[0]
  if (Object.hasOwn(possibleOsArgs, argument)) {
    possibleOsArgs[argument]();
  } else {
    throw new OperationError();
  }
}

export default osModule;
