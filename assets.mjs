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
var appsDir = "./src/apps";

if (option === "-b") {
  cpx.copySync(source, `${appsDir}/cms/public`);
  cpx.copySync(source, `${appsDir}/maintenance/public`);
  cpx.copySync(source, `${appsDir}/website/public`);
  console.log("Assets copied.");
} else {
  cpx.watch(source, `${appsDir}/cms/public`);
  cpx.watch(source, `${appsDir}/maintenance/public`);
  cpx.watch(source, `${appsDir}/website/public`);
  console.log("Watching assets..");
}
