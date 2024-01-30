import { EOL, arch, cpus, homedir, userInfo } from 'os';

console.log(`Your system EOL: ${JSON.stringify(EOL)}`);
console.log(`Your home directory: ${homedir()}`);
console.log(`Your system User Name: ${userInfo().username}`);
console.log(`Your CPU architecture: ${arch()}`);
const cpuList = cpus().map((cpu) => ({
  Model: cpu.model,
  'Clock rate (GHz)': cpu.speed / 1000
}));
console.log(`Number of CPUS: ${cpuList.length}`);
console.table(cpuList);
