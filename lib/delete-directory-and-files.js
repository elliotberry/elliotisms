import fs from "node:fs/promises"
/**
 * Deletes a directory and its contents asynchronously.
 *
 * This function attempts to remove the specified directory and all of its files and subdirectories
 * using the `fs.rm` method with the `recursive` option set to `true`. If the directory exists and
 * is successfully deleted, the function returns `true`. If the directory does not exist or an error 
 * occurs during deletion, it catches the error and returns `false`.
 *
 * @async
 * @param {string} dirPath - The path to the directory that needs to be deleted.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the directory existed and was 
 *                             successfully deleted, or `false` if the directory did not exist 
 *                             or an error occurred.
 *
 * @example
 * (async () => {
 *   const result = await deleteDirectoryAndFiles('/path/to/directory');
 *   console.log(result); // true if directory was deleted, false otherwise
 * })();
 */
async function deleteDirectoryAndFiles(dirPath) {
    let existed = false;
    try {
        await fs.rm(dirPath, { recursive: true })
        existed = true;
        
    } catch {}
    return existed;
}

export default deleteDirectoryAndFiles