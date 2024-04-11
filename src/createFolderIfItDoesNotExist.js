import exists from './exists.js';
import fs from "node:fs/promises";
import path from "node:path";

const createFolderIfItDoesNotExist = async (directoryPath) => {
  if (await !exists(directoryPath)) {
    await fs.mkdir(directoryPath);
  }
  return path.resolve(directoryPath);
}
export default createFolderIfItDoesNotExist;