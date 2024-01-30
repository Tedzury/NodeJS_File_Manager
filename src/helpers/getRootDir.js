import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getRootDir = (url) => dirname(fileURLToPath(url));

export default getRootDir;
