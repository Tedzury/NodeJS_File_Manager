export default class OperationError extends Error {
  constructor () {
    super('Operation failed');
    this.name = 'Operation failure';
  }
}
