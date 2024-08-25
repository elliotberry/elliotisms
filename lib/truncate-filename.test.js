import { strict as assert } from 'assert';
import test from 'node:test';
import path from 'path';
import truncateFilenameForConsole from './truncate-filename.js';

// Sample test cases
test('truncateFilenameForConsole', async (t) => {
  await t.test('Should return the original filename if it does not exceed maxLength', () => {
    const filename = "short.txt";
    const result = truncateFilenameForConsole(filename, 50);
    assert.equal(result, filename);
  });

  await t.test('Should truncate the filename and preserve the extension', () => {
    const filename = "very_long_filename_example_that_needs_to_be_truncated.txt";
    const result = truncateFilenameForConsole(filename, 30);
    const expected = "very_lo...to_be_truncated.txt";
    assert.equal(result, expected);
  });

  await t.test('Should handle filenames with no extension', () => {
    const filename = "very_long_filename_with_no_extension";
    const result = truncateFilenameForConsole(filename, 20);
    const expected = "very_long_f..._extension";
    assert.equal(result, expected);
  });

  await t.test('Should handle filenames where the base name is shorter than maxLength but the total length exceeds maxLength due to extension', () => {
    const filename = "short_basename_but_long_extension_name.txt";
    const result = truncateFilenameForConsole(filename, 25);
    const expected = "short_base...name.txt";
    assert.equal(result, expected);
  });

  await t.test('Should handle edge case where maxLength is very small', () => {
    const filename = "filename.txt";
    const result = truncateFilenameForConsole(filename, 5);
    const expected = "..txt";
    assert.equal(result, expected);
  });
});
