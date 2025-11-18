
export default silenceImport = fn => {
  const original = console.log;
  console.log = () => {}; // mute
  try {
    return fn();          // run the import or code
  } finally {
    console.log = original; // unmute
  }
};
/*
example usage:
const myModule = silenceImport(() => require('my-noisy-module'));
*/

