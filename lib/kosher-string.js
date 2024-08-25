/**
 * Checks if a given string is kosher (valid).
 *
 * This function takes a string as an input, converts it to lowercase, trims any whitespace,
 * and then checks several conditions to determine if the string is valid.
 *
 * @param {string} str - The string to be validated.
 * @returns {boolean} Returns `true` if the string is valid, otherwise returns `false`.
 * 
 * The function will return `false` in the following cases:
 * - The string length is 0 after trimming.
 * - The string is null or undefined.
 * - The string is not of type "string".
 * - The string is NaN.
 */
const kosherString = (str) => {
  try {
    str = str.toLowerCase().trim();

    if (
      str.length === 0 ||
      str === null ||
      str === undefined ||
      str === NaN ||
      typeof str !== "string"
    ) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export default kosherString;
