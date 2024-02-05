import { readdir, stat } from 'fs/promises';
import OperationError from '../helpers/operationError.js';
import { resolve } from 'path';

const navModule = (_appState) => {
  const list = async () => {
    try {
      const list = (await readdir(_appState.getCurrDir(), { withFileTypes: true }))
        .map(dirent => {
          const { name } = dirent;
          const type = dirent.isFile() ? 'file' : dirent.isDirectory() ? 'directory' : 'else';
          return { Name: name, Type: type };
        });
      const directories = list.filter((item) => item.Type === 'directory').sort((a, b) => a.Name.localeCompare(b.Name));
      const files = list.filter((item) => item.Type !== 'directory').sort((a, b) => a.Name.localeCompare(b.Name));

      console.table([...directories, ...files]);
    } catch {
      throw new OperationError();
    }
  }
  const changeDir = async (_path) => {
    if (!_path) throw new OperationError();
    const newPath = resolve(_appState.getCurrDir(), _path);
    try {
      const stats = await stat(newPath);
      if (stats.isDirectory()) {
        _appState.setCurrDir(newPath)
      } else {
        throw new OperationError()
      }
    } catch {
      throw new OperationError();
    }
  }
  return {
    cd: (_path) => changeDir(_path),
    ls: () => list()
  }
};

export default navModule;
