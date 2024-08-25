/**
 * This module provides functionality to find the directory path of the current script and check for the existence 
 * of a `package.json` file in that directory or its parent directories.
 *
 * It exports an asynchronous `main` function that returns the directory path where a `package.json` file is found.
 * If no such file is found, it traverses up the directory tree until it finds a directory containing a `package.json` file.
 *
 * @module DirectoryFinder
 */

import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

import exists from "./exists.js";

/**
 * Asynchronously gets the directory name of the current script.
 *
 * This function reads the command-line arguments to determine the filename of the current script and then uses 
 * `path.dirname` to get the directory name.
 *
 * @async
 * @returns {Promise<string>} The directory name of the current script.
 */
async function getdirname() {
  let arguments_ = process.argv;
  let __filename = arguments_[1];
  return path.dirname(__filename);
}

/**
 * Main function that finds the directory containing the `package.json` file.
 *
 * This function first checks if the current script's directory contains a `package.json` file. If not, it traverses
 * up the directory tree until it finds a directory with a `package.json` file.
 *
 * @async
 * @returns {Promise<string>} The directory path where a `package.json` file is found. If no `package.json` file 
 *                            is found in the current directory or any parent directories, it returns the root directory.
 */
const main = async () => {
  let g = await getdirname();
  if (await exists(path.join(g, "package.json"))) {
    return g;
  } else {
    while ((await exists(path.join(g, "package.json"))) === false) {
      g = path.join(g, "..");
    }
    return path.resolve(g);
  }
};

export default main;