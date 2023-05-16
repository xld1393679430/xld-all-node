import Command from "@lerna-cli-xld-v2/command";
import { log } from "@lerna-cli-xld-v2/utils";
import createTemplate from "./createTemplate.js";
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'

/**
 * examples:
 *  1, lerna-cli-xld init aa -t project -tp vue-template -f
 *  2, lerna-cli-xld init
 */
class InitCommand extends Command {
  get command() {
    return "init [name]";
  }

  get description() {
    return "init project";
  }

  get options() {
    return [
      ["-f, --force", "是否强制更新", false],
      ["-t, --type <type>", "项目类型（project/page）"],
      ["-tp, --template <template>", "模板名称"]
    ];
  }

  async action([name, opts]) {
    log.info("init action", name, opts);
    // 1,选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(name, opts);
    // 2, 项目模板下载
    await downloadTemplate(selectedTemplate)
    // 3, 安装项目模板至项目目录
    await installTemplate(selectedTemplate, opts)
    // 4,
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
