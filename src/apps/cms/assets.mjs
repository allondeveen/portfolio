/* global process console */
import cpx from "cpx";

const processArguments = process.argv.slice(2);

if (processArguments.length > 1) {
  console.error("Too many arguments");
  process.exit(1);
}
const option = processArguments[0] ?? "-b";
if (option !== "-w" && option !== "-b") {
  console.error("You can only build (-b) or watch (-w)");
  process.exit(1);
}

var source = "./assets/*";
var destination = "./public";

if (option === "-b") {
  cpx.copy(source, destination);
  console.log("Assets copied.");
} else {
  cpx.watch(source, destination);
  console.log("Watching assets..");
}
