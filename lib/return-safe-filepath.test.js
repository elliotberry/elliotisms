import { test } from "node:test"
import fs from "node:fs/promises"
import path from "node:path"
import returnSafeFilePath from "./return-safe-filepath.js"
import { fail, equal } from "node:assert"
import createRandomFile from "../test-fixtures/create-random-file.js"
import getScriptPath from "./get-script-path.js"

test("Returns a safe file path when destination is not a directory", async (assert) => {
  let base = await getScriptPath()
  
  const destination = path.join(base, "test.txt")
  await createRandomFile(destination)
  const expectedFilePath = path.resolve(destination)

  const result = await returnSafeFilePath(destination)
  equal(result, expectedFilePath, "Returned a safe file path")
  await fs.unlink(destination)
console.log("destination", destination)
})

test("Throws an error when destination is a directory", async (assert) => {
  let base = await getScriptPath()
  const destination =  path.join(base, "test_directory")
  await fs.mkdir(destination)

  try {
    await returnSafeFilePath(destination)
    fail("Expected an error but function executed successfully")
  } catch (error) {
    equal(
      error.message,
      "destination is a directory",
      "Throws an error when destination is a directory"
    )
  }

  await fs.rmdir(destination)
}),
  test("Returns a unique file path when destination already exists", async (assert) => {
    const destination = "./test.txt"
    const existingFileContent = "Existing file content"
    const expectedFilePathPattern = /^.*-[\d]+\.txt$/

    // Create an existing file
    await fs.writeFile(destination, existingFileContent)

    try {
      const result = await returnSafeFilePath(destination)
      assert.ok(
        expectedFilePathPattern.test(result),
        "Returned a unique file path"
      )
    } catch (error) {
      fail(`Unexpected error: ${error.message}`)
    }

    // Clean up: remove the existing file
    await fs.unlink(destination)
  })
