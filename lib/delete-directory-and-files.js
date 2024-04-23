import fs from "node:fs/promises"
async function deleteDirectoryAndFiles(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true })

        
    } catch (e) {
        throw new Error(`Error deleting directory ${dirPath}: ${e.message}`)
    }
}

export default deleteDirectoryAndFiles