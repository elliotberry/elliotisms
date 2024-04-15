import exists from './exists.js';
import fs from "node:fs/promises";
import path from "node:path";

const createFolderIfItDoesNotExist = async (directoryPath) => {
  let doesExist = await exists(directoryPath)
  if (!doesExist) {
    await fs.mkdir(directoryPath);
  }
  return path.resolve(directoryPath);
}
export default createFolderIfItDoesNotExist;