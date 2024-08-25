/**
 * Replaces all occurrences of a substring within a string with a new substring.
 *
 * @param {string} str - The original string in which to perform replacements.
 * @param {string} find - The substring to find and replace.
 * @param {string} replace - The substring to replace the found substring with.
 * @returns {string} A new string with all occurrences of `find` replaced by `replace`.
 *
 * @example
 * const originalString = 'Hello world, world!';
 * const searchString = 'world';
 * const replaceString = 'universe';
 * const result = replaceAll(originalString, searchString, replaceString);
 * console.log(result); // Output: 'Hello universe, universe!'
 */
const replaceAll = (str, find, replace) => {
  return str.split(find).join(replace);
};

export default replaceAll;
