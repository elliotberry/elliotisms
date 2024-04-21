import { fileURLToPath } from "url"

import path, { dirname } from "node:path"
import fs from "node:fs/promises"
import exists from "./exists.js"
async function getdirname() {
  // Get the directory name of the current module
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  return __dirname
}

const main = async () => {
  let g = await getdirname()
  if (await exists(path.join(g, "package.json"))) {
    return g
  } else {
    while ((await exists(path.join(g, "package.json"))) === false) {
      g = path.join(g, "..")
    }
    return path.resolve(g)
  }
}

export default main
