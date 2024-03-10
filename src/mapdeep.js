async function mapDeep(obj, func, parent = null, key = null, path = '') {
  let result;

  // Construct the current path
  const currentPath = key !== null ? (path ? `${path}.${key}` : key) : '';

  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = await mapDeep(obj[i], func, obj, i, `${currentPath}[${i}]`);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = await mapDeep(v, func, obj, k, `${currentPath}.${k}`);
    }
  } else {
    // Apply the transformation function to non-object/non-array values
    result = await func(obj, key, parent, currentPath);
  }

  return result;
}
export default mapDeep;