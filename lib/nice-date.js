/**
 * Returns the ordinal suffix for a given day.
 *
 * @param {number} day - The day of the month.
 * @returns {string} The day with its ordinal suffix (e.g., '1st', '2nd', '3rd', '4th').
 */
const getOrdinalSuffix = day => {
  const j = day % 10,
    k = day % 100;
  if (j == 1 && k != 11) {
    return day + 'st';
  }
  if (j == 2 && k != 12) {
    return day + 'nd';
  }
  if (j == 3 && k != 13) {
    return day + 'rd';
  }
  return day + 'th';
};

/**
 * Converts a date to the 'America/New_York' timezone and returns it as a Date object.
 * Throws an error if the input date is invalid.
 *
 * @param {(Date|string)} date - The input date.
 * @returns {Date} A Date object representing the input date in the 'America/New_York' timezone.
 * @throws Will throw an error if the input date is invalid.
 */
const dateToMyLocale = date => {
  if (!date) {
    throw new Error('Invalid Date');
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  let g = date.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  let gg = new Date(g);
  return gg;
}

/**
 * Formats a given date into a human-readable string with the format: 
 * 'MMM Dth, YYYY, HH:mmam/pm & Ss'.
 *
 * @param {Date} d - The input date.
 * @returns {string} A formatted date string.
 */
const formatDateToNice = d => {
  let date = dateToMyLocale(d);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  const second = date.getSeconds();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${getOrdinalSuffix(day)}, ${year}, ${hour}:${minute.toString().padStart(2, '0')}${ampm.toLowerCase()} & ${second}s`;
};

/**
 * Gets the current date and time and formats it into a human-readable string.
 * If an error occurs, logs the error and returns 'error'.
 *
 * @returns {string} A formatted date string or 'error' if an exception occurs.
 */
const getDateTime = () => {
  try {
    let d = new Date();
    return formatDateToNice(d);
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

export { formatDateToNice, getDateTime, dateToMyLocale };