import fs from "node:fs/promises"
async function deleteDirectoryAndFiles(dirPath) {
    let existed = false;
    try {
        await fs.rm(dirPath, { recursive: true })
        existed = true;
        
    } catch (e) {
        
    }
    return existed;
}

export default deleteDirectoryAndFiles