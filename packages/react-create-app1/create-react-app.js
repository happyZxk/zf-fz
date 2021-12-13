const chalk = require("chalk");
const { Command } = require("commander");
const path = require("path");
const fs = require("fs-extra");
const packageJson = require("./package.json");
const { spawn } = require("cross-spawn");
async function init() {
  let projectName;
  new Command(packageJson.name) //项目名
    .version(packageJson.version) //项目版本号
    .arguments("<project-directory>") //项目的目录名
    .usage(`${chalk.green("<project-directory>")}`)
    .action((name) => {
      projectName = name;
    })
    .parse(process.argv); //[node的完整路径，当前node的脚本路径，其他参数]
  console.log(`projectName`, projectName);
  await createApp(projectName);
}
async function createApp(appName) {
  let root = path.resolve(appName); //生成项目的绝对路径
  fs.ensureDirSync(appName); //保证路径存在不存在就创建
  console.log(`Create a new React app in ${chalk.green(root)}.`);
  const packageJSON = {
    name: appName,
    version: "0.1.0",
    private: true,
  };
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJSON)
  );
  const originalDirectory = process.cwd(); //原始的工作目录
  process.chdir(root); //change directory 改变工作目录

  await run(root, appName, originalDirectory);
}

/**
 *
 * @param {*} root 创建的项目的路径
 * @param {*} appName 项目名
 * @param {*} originalDirectory 原始的工作目录
 */
async function run(root, appName, originalDirectory) {
  let scriptName = "react-scripts"; //create 生成的源代码里面 源文件编译,启动服务放在了react-scripts
  let templateName = "cra-template";
  const allDependencies = ["react", "react-dom", scriptName, templateName];
  console.log(`Installing packages. This might take a couple of minutes`);
  console.log(
    `Installing ${chalk.cyan("react")}, ${chalk.cyan(
      "react-dom"
    )}, and ${chalk.cyan(scriptName)} with ${chalk.cyan(templateName)}...`
  );
  await install(root, allDependencies);
  // 项目根目录 项目的名字 verbose是否显示详细信息 原始的目录 模板名称cra-template
  let data = [root, appName, true, originalDirectory, templateName];
  let source = `
  const init = require('react-scripts/scripts/init.js');
  init.apply(null, JSON.parse(process.argv[1]));
`;
  await executeNodeScript({ cwd: process.cwd(), data, source });
  console.log("Done.");
  process.exit(0);
}
async function install(root, allDependencies) {
  return new Promise((resolve) => {
    const command = "yarnpkg";
    const args = ["add", "--exact", ...allDependencies, "--cwd", root];
    console.log(`command`, command);
    console.log(`args`, args);
    const child = spawn(command, args, { stdio: "inherit" }); //输入输出和父进程享用一个
    child.on("close", resolve);
  });
}

async function executeNodeScript({ cwd, data, source }) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath, //可执行文件的路径
      ["-e", source, "--", JSON.stringify(data)],
      { cwd, stdio: "inherit" }
    );
    child.on("close", resolve);
  });
}
module.exports = {
  init,
};
