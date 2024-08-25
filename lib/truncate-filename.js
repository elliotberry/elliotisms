import path from "node:path";

/**
 * Truncates a filename to a specified maximum length, ensuring that the file extension is preserved and the middle part of the base name is replaced with ellipses if necessary.
 *
 * @param {string} filename - The full filename to be truncated.
 * @param {number} [maxLength=50] - The maximum length of the truncated filename. Default is 50 characters.
 * @returns {string} The truncated filename if it exceeds the maximum length; otherwise, returns the original filename.
 *
 * @example
 * const filename = "very_long_filename_example_that_needs_to_be_truncated.txt";
 * const result = truncateFilenameForConsole(filename);
 * console.log(result); // Output could be "very_long_filenam...needs_to_be_truncated.txt" depending on maxLength.
 */
const truncateFilenameForConsole = (filename, maxLength = 50) => {
  if (filename.length <= maxLength) return filename;

  const extension = path.extname(filename);
  const base = path.basename(filename, extension);
  const totalLength = base.length + extension.length;
  const ellipsisLength = 3;

  if (totalLength <= maxLength) return filename;

  const truncateLength = maxLength - extension.length - ellipsisLength;
  const frontLength = Math.ceil(truncateLength / 2);
  const backLength = Math.floor(truncateLength / 2);

  const truncatedBase =
    base.slice(0, frontLength) +
    "..." +
    base.slice(-backLength);

  return truncatedBase + extension;
};

export default truncateFilenameForConsole;
