import fs from "node:fs/promises"
import path from "node:path"

import exists from "./exists.js"

const isDirectoryWithCatch = async (destination) => {
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
  return isDir
}

function safelyParseInt(string_) {
  try {
    return Number.parseInt(string_)
  } catch {
    return Number.NaN
  }
}
function getBasenameAndSuffix(string_) {

  let theName
  let theSuffix = "1" //default starting suffix
  //array of strings with possible suffix delimited by "-"
  let theDashed = string_.split("-")
  if (theDashed.length === 1) {
    //if no dashes

    return { nameWithoutSuffix: string_, suffix: theSuffix }
  } else {
    let possibleSuffix = theDashed.at(-1)
    let possibleSuffixNumber = safelyParseInt(possibleSuffix)
    if (possibleSuffixNumber === Number.NaN) {
      return { nameWithoutSuffix: string_, suffix: theSuffix }
    } else {
      theName = theDashed.slice(0, -1).join("-")
      theSuffix = possibleSuffixNumber
      return { nameWithoutSuffix: theName, suffix: theSuffix }
    }
  }
}

const splitFileIntoThePartsINeed = (destination) => {
  let { dir, base, ext, name } = path.parse(destination)

  let { nameWithoutSuffix, suffix } = getBasenameAndSuffix(name)

  return { nameWithoutSuffix, directory: dir, extension: ext, suffix }
}
const makeDestination = (directory, nameWithoutSuffix, suffix, extension) => {
  return path.join(directory, `${nameWithoutSuffix}-${suffix}${extension}`)
}
const returnSafeFilePath = async (destination) => {
  if (await isDirectoryWithCatch(destination)) {
    throw new Error("destination is a directory")
  }
  destination = path.resolve(destination)

  if ((await exists(destination)) === false) {
    return destination
  }

  let { nameWithoutSuffix, extension, suffix, directory } =
    splitFileIntoThePartsINeed(destination)


  let count = suffix
  destination = makeDestination(directory, nameWithoutSuffix, count, extension)
  while ((await exists(destination)) === true) {
    count++

    destination = makeDestination(
      directory,
      nameWithoutSuffix,
      count,
      extension
    )
  }
  return destination
}

export default returnSafeFilePath
