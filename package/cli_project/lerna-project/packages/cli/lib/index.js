import creatInitCommand from "@lerna-cli-xld-v2/init";
import createCli from "./createCli.js";
import "./exception.js";

export default function (args) {
  const program = createCli();

  creatInitCommand(program);

  program.parse(process.argv);
}
