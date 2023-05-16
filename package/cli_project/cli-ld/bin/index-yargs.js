#! /usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const dedent = require("dedent");

const arg = hideBin(process.argv);
const cli = yargs(arg);
cli
  .usage("Usage: cli-ld [command] <options>")
  .demandCommand(1, "请最少输入一个参数. Press --help to see all available commands and options")
  .strict()
  .recommendCommands()
  .fail((err, msg) => {
	console.error("err:", err)
	console.info("msg:", msg)
  })
  .alias("h", "help")
  .alias("v", "version")
  .alias("V", "version")
  .wrap(cli.terminalWidth() / 2) // 命令行宽度
  .epilogue(
    dedent`
		欢迎使用
	`
  ) //页脚添加的字符
  .options({
    debug: {
      type: "boolean",
      description: "启动调试模式",
      alias: "d",
    },
  })
  .option("registry", {
    type: "string",
    description: "定义全局仓库地址",
    alias: "r",
  })
  .group(["debug"], "开发选项:")
  .command("init [name]", "项目初始化", (yargs) => {
    yargs.option("name", {
      type: "string",
      describe: "项目的名称",
      alias: "n",
    }),
      (argv) => {
        // console.log(argv);
      };
  }).argv;
