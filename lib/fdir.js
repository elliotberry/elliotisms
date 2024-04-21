import { fdir } from "fdir"

const fdirQuery = async (absoluteDirectory, directoriesIncluded = false) => {
  let files = new fdir().withFullPaths().crawl(absoluteDirectory)
  if (directoriesIncluded === true) {
    files = files.withDirs()
  }
  let fileOutput = await files.withPromise()
  return fileOutput
}