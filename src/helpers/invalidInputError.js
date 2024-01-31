export default class InvalidInputError extends Error {
  constructor () {
    super('Invalid input');
    this.name = 'Command execution failed due to invalid input';
  }
}
