/**
 * Checks if the array contains any element that includes the given string, ignoring case.
 *
 * This method extends the Array prototype to add a `fuzzyIncludes` function which performs
 * a case-insensitive search within the array elements. It converts both the target string
 * and each array element to lowercase before checking for inclusion.
 *
 * @param {string} str - The string to be searched for within the array elements.
 * @returns {boolean} Returns `true` if any element in the array, when converted to lowercase,
 *                    includes the given string (also converted to lowercase). Otherwise, returns `false`.
 *
 * @example
 * const arr = ['Hello', 'world', 'foo', 'bar'];
 * console.log(arr.fuzzyIncludes('HELLO')); // true
 * console.log(arr.fuzzyIncludes('baz'));   // false
 */
Array.prototype.fuzzyIncludes = function (str) {
  str = str.toLowerCase();
  return this.reduce((acc, el) => acc || el.toLowerCase().indexOf(str) > -1 , false);
}
