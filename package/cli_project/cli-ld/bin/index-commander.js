#! /usr/bin/env node

const commander = require("commander");
const pkg = require("../package.json");

const { program } = commander;
// const program = new commander.Command();

program
  .name(pkg.name)
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d, --debug", "是否开启调试模式", false)
  .option("-e, --envName <envName>", "获取环境变量");

// command 注册命令
const clone = program.command("clone <source> [destination]");
clone
  .description("clone命令的描述")
  .option("-f, --force", "是否强制克隆")
  .action((source, destination, cmdObj) => {
  });

  // 这里cli-ld install [name] 相当于 vue [name]
program
  .command("install [name]", "install package", {
    executableFile: "vue",
  })
  .alias("i");

// addCommand 注册子命令
// cli-ld service [options] [command]
const service = new commander.Command("service");
service
  .command("start [port]")
  .description("start service at port")
  .action((port) => {
  });
program.addCommand(service);

// 下面会匹配除上面以外的命令
program
  .arguments("<cmd> [options]")
  .description("匹配除上面以外的命令", {
    cmd: "command to run",
    options: "options for command",
  })
  .action((cmd, options) => {
    // console.log("<cmd> [options]:", cmd, options);
  });

program.parse(process.argv);

// const options = program.opts();
// console.log(options.debug);
// console.log(options.envName);
