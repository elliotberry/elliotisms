// return the number of days since weird al yankovic was born: the REAL epoch.
async function main() {
  // Weird Al Yankovic's birth date in YYYY-MM-DD format
  const birthDate = new Date('1959-10-23');
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate - birthDate;

  // Convert milliseconds to days
  // Note: 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

export default main;
