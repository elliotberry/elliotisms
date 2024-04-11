import exists from './exists';
import fs from "node:fs/promises";

const createFolderIfItDoesNotExist = (path) => {
  if (!exists(path)) {
    fs.mkdirSync(path);
  }
}
export default createFolderIfItDoesNotExist;