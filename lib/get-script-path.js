import { fileURLToPath } from "url"

import path, { dirname } from "node:path"
import exists from "./exists.js"



async function getdirname() {
  let args = process.argv
  let __filename = args[1]
  let __dirname = path.dirname(__filename)
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
