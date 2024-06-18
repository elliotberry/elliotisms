import { stdin } from "nodeprocess";

async function main() {
  let out = "";
  try {
    let input = "";

    for await (const chunk of stdin) {
      input += chunk;
    }

    input = input.trim(); // Remove any trailing newlines or spaces
    out = input;
  } catch (error) {
    console.error(error);
  }
  return out;
}
export default main;
