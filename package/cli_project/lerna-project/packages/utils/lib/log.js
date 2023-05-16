import log from "npmlog";
import isDebug from "./isDebug.js";

if (isDebug()) {
  log.level = "verbose"; // 这个没有生效
} else {
  log.level = "info";
}

// log.heading = ":::lerna-cli-xld:::"
log.addLevel("success", 2000, { fg: 'red' })
export default log;