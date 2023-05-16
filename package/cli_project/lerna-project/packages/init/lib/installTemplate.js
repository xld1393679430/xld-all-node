import path from "node:path";
import { pathExistsSync } from "path-exists";
import fse from "fs-extra";
import ora from "ora";
import ejs from "ejs";
import glob from "glob";
import { log, printErrorLog, makeList, makeInput } from "@lerna-cli-xld-v2/utils";

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, "node_modules", template.npmName, "template");
}

function getPluginsFilePath(targetPath, template) {
  return path.resolve(targetPath, "node_modules", template.npmName, "plugins", "index.js");
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template);
  const fileList = fse.readdirSync(originFile);
  const spinner = ora("正在拷贝模板文件...").start();
  try {
    fileList.map((file) => {
      fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`);
    });
    spinner.stop();
    log.success("拷贝成功");
  } catch (error) {
    spinner.stop();
    log.error("拷贝失败!!! " + error.message);
  }
}

async function ejsRender(targetPath, template, installDir, options) {
  const { ejsIgnore = [] } = template;
  const { name } = options;
  let data = {};

  // 执行插件
  const pluginsPath = getPluginsFilePath(targetPath, template);
  if (pathExistsSync(pluginsPath)) {
    const pluginFn = (await import(pluginsPath)).default;
    const api = {
      makeInput,
      makeList,
    };
    data = await pluginFn(api);
  }

  const ejsData = {
    data: {
      name,
      ...data,
    },
  };
  glob(
    "**",
    {
      cwd: installDir,
      nodir: true,
      ignore: [...ejsIgnore, "**/node_modules/**"],
    },
    (err, files) => {
      files.forEach((file) => {
        const filePath = path.join(installDir, file);
        ejs.renderFile(filePath, ejsData, (err, result) => {
          if (!err) {
            fse.writeFileSync(filePath, result);
          } else {
            printErrorLog(err);
          }
        });
      });
    }
  );
}

export default async function installTemplate(selectedTemplate, opts) {
  const { targetPath, name, template } = selectedTemplate;
  const { force = false } = opts;
  const rootDir = process.cwd();

  fse.ensureDirSync(targetPath);

  const installDir = path.resolve(`${rootDir}/${name}`);
  if (pathExistsSync(installDir)) {
    if (!force) {
      throw new Error(`当前目录已存在${name}文件`);
    } else {
      fse.removeSync(installDir);
      fse.ensureDirSync(installDir);
    }
  } else {
    fse.ensureDirSync(installDir);
  }

  copyFile(targetPath, template, installDir);

  await ejsRender(targetPath, template, installDir, { name });
}
