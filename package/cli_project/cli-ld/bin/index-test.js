#! /usr/bin/env node

const argv = require("process").argv;
const lib = require("cli-ld-lib");

const command = argv[2];

const options = argv.slice(3);

if (options.length > 1) {
  let [option, param] = options;
  option = option?.replace(/--/, "");

  if (command) {
    if (lib[command]) {
      lib[command]({ option, param });
    } else {
      // console.log("无效的命令");
    }
  } else {
    // console.log("请输入命令");
  }
}

// 实现参数解析 --version 或者 -v
if (command.startsWith('--') || command.startsWith('-')) {
	const globalOption = command.replace(/--|-/g, '')
	// console.log("---globalOption---", globalOption)
	if (['version', 'v', 'V'].includes(globalOption)) {
		// console.log("1.0.0")
	}
}
