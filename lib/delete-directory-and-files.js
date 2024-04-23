async function deleteDirectoryAndFiles(dirPath) {
    try {
        await fs.promises.rm(dirPath, { recursive: true })

        
    } catch (e) {
        throw new Error(`Error deleting directory ${dirPath}: ${e.message}`)
    }
}

export default deleteDirectoryAndFiles