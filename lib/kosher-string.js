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
