import exists from './exists.js';
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
const createFolderIfItDoesNotExist = async (directoryPath) => {
  
  if (directoryPath.indexOf("~") > -1) {
    let homeDir = os.homedir();
    directoryPath = directoryPath.replace("~", homeDir);
  }
  let doesExist = await exists(directoryPath)
  if (!doesExist) {
    await fs.mkdir(directoryPath);
  }
  return path.resolve(directoryPath);
}
export default createFolderIfItDoesNotExist;