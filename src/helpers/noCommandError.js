export default class NoCommandError extends Error {
  constructor () {
    super('No such command!');
    this.name = 'Command execution failure';
  }
}
