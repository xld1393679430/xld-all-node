import path from "node:path";
import fse from "fs-extra";
import semver from "semver";
import chalk from "chalk";
import { program } from "commander";
import { dirname } from "dirname-filename-esm";
import { log } from "@lerna-cli-xld-v2/utils";

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = fse.readJSONSync(pkgPath);
const LOWEST_NODE_VERSION = "14.0.0"; // 限定node最低版本

function checkNodeVersion() {
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(`Node需要按照最低${chalk.red(LOWEST_NODE_VERSION)}版本`);
  }
}

function preAction() {
  // 检查Node版本
  checkNodeVersion();
}

export default function () {
  log.info("当前CLI的version是：", pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false)
    .hook("preAction", preAction);

  // 监听Debug模式是否开启
  program.on("option:debug", () => {
    if (program.opts().debug) {
      log.info("Debug 模式启动");
    }
  });

  // 监听未知的命令
  program.on("command:*", (obj) => {
    log.error("未知的命令" + obj[0]);
  });

  return program;
}
