import { access, copyFile, constants } from "node:fs/promises"

async function ensureEnv() {
  try {
    await access(".env", constants.F_OK)
    // .env exists, nothing to do
  } catch {
    // .env doesn't exist — copy it from .example.env
    try {
      await copyFile(".example.env", ".env")
      console.log(".env created from .example.env")
    } catch (err) {
      console.error("Failed to copy .example.env to .env:", err)
    }
  }
}
export default ensureEnv