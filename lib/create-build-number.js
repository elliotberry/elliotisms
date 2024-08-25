import minutesUntil420 from './minutes-until-420.js';
/**
 * Generates a build number based on the current date and time.
 *
 * The build number format is: "year.month.day.minutesUntil420()"
 * where `minutesUntil420()` is a custom function that calculates the minutes remaining 
 * until 4:20 PM on the current day.
 *
 * @returns {string} A string representing the build number in the format: "YYYY.MM.DD.minutesUntil420()".
 */
function createBuildNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Construct the build number in the format: year.month.day.minutesUntil420()
  return `${year}.${month}.${day}.${minutesUntil420()}`;
}

export default createBuildNumber;
