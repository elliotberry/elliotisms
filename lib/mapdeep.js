/**
 * Recursively applies a transformation function to all elements within a deeply nested object or array.
 * The function traverses through each level of the input object or array, applying the provided transformation
 * function `transformFunc` to each non-object/non-array value. It retains the original structure of the input while 
 * modifying its contents as per the transformation function.
 *
 * @param {Object|Array} input - The input object or array to be recursively transformed.
 * @param {Function} transformFunc - The transformation function to be applied to each non-object/non-array value.
 * @param {Object|null} parentElement - The parent object or array of the current element (for internal use).
 * @param {string|null} currentKey - The key or index of the current element in its parent (for internal use).
 * @param {string} currentPath - The current path string representing the location within the original object (for internal use).
 * @param {Object|null} rootInput - The root object or array being transformed (for internal use).
 * @returns {Object|Array} - The new object or array with the transformation applied to all non-object/non-array values.
 */
async function mapDeep(
  input,
  transformFunction,
  parentElement = null,
  currentKey = null,
  currentPath = "",
  rootInput = null
) {
  let transformedResult;
  
  if (rootInput === null) {
    rootInput = input;
  }

  // Construct the current path
  const newPath =
    currentKey === null ?
      currentPath
    : (currentPath ? `${currentPath}.${currentKey}` : currentKey);

  if (Array.isArray(input)) {
    transformedResult = [];
    let index = 0;
    for await (const element of input) {
      transformedResult[index] = await mapDeep(
        element,
        transformFunction,
        input,
        index,
        `${newPath}[${index}]`,
        rootInput
      );
      index++;
    }
  } else if (typeof input === "object" && input !== null) {
    transformedResult = {};
    for await (const [key, value] of Object.entries(input)) {
      transformedResult[key] = await mapDeep(
        value,
        transformFunction,
        input,
        key,
        newPath,
        rootInput
      );
    }
  } else {
    // Apply the transformation function to non-object/non-array values
    transformedResult = await transformFunction(input, currentKey, parentElement, newPath, rootInput);
  }

  return transformedResult;
}

export default mapDeep;