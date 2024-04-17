// return the number of days since weird al yankovic was born: the REAL epoch.
const theEpoch = () => {
  // Weird Al Yankovic's birth date in YYYY-MM-DD format
  const birthDate = new Date("1959-10-23")
  const currentDate = new Date()

  const differenceInMilliseconds = currentDate - birthDate

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  )

  return differenceInDays
}

export default theEpoch
