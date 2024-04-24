import exists from "./exists.js"
import fs from "node:fs/promises"
import path from "node:path"


const recursiveMove = (fileName, destDir) => {
  return new Promise((resolve, reject) => {
      let name = path.parse(fileName).name
      let ext = path.extname(fileName)
      let count = 0
      let destPath = destPathFactory(name, ext, destDir, count)
      while (existsSync(destPath)) {
          count++
          destPath = destPathFactory(name, ext, destDir, count)
      }
      resolve(destPath)
  })
}


const returnSafeFilePath = async (destination) => {
  let isDir = false
  try {
    let ii = await fs.stat(destination)
    isDir = ii.isDirectory()
  } catch (error) {
    if (error.code === "ENOENT") {
      isDir = false
    } else {
      throw error
    }
  }
  if (isDir) {
    throw new Error("destination is a directory")
  } else {
    destination = path.resolve(destination)
    let file = path.basename(destination)
    let directory = path.dirname(destination)
    if (await exists(destination) === false) {
      return destination
    }
    let count = 0
    while (await exists(destination) === true) {
      let suffix = `-${count}`
      if (count === 0) {
        suffix = ""
      }
      let [name, ext] = file.split(".")
      file = `${name}${suffix}.${ext}`
      destination = path.join(directory, file)

      count++
    }
    return destination
  }
}

export default returnSafeFilePath
