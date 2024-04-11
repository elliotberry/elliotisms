
import { describe, it, test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import createFolderIfItDoesNotExist from './createFolderIfItDoesNotExist.js';

describe('createFolderIfItDoesNotExist', () => {
  beforeEach(async () => {
    // Set up any necessary test fixtures or state
  });

  afterEach(async () => {
    // Clean up any test fixtures or state
  });

  it('should create a folder if it does not exist', async () => {
    const directoryPath = './test-folder';
    const resolvedPath = await createFolderIfItDoesNotExist(directoryPath);

    // Assert that the folder is created
    assert.strictEqual(fs.existsSync(directoryPath), true);

    // Assert that the resolved path is correct
    assert.strictEqual(resolvedPath, path.resolve(directoryPath));
  });

  // Add more tests as needed
});