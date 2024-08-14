import crypto from "node:crypto";

//this id is 10^{15} smaller than nano id
const yoctoid = (length = 10) => {
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  const hexArray = new Array(length);

  for (let index = 0; index < length; index++) {
    hexArray[index] = (randomValues[index] % 16).toString(16);
  }

  return hexArray.join('');
};

export default yoctoid;