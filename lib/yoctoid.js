import crypto from "node:crypto";

//this id is 10^{15} smaller than nano id

const yoctoid = (length = 10) => {
  // Generate random bytes and convert them to a hex string
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

export default yoctoid;