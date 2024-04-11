import exists from './exists.js';
import fs from "node:fs/promises";

const createFolderIfItDoesNotExist = (path) => {
  if (!exists(path)) {
    fs.mkdirSync(path);
  }
}
export default createFolderIfItDoesNotExist;