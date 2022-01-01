const path = require("path");
const appDirectory = process.cwd(); //当前工作目录

//接受一个相对路径返回一个从应用目录出发的绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
module.exports = {
  appHtml: resolveApp("public/index.html"), //html模板给html-webpack-plugin使用
  appSrc: resolveApp("src"), //编译的文件包含路径
  appIndexTs: resolveApp("src/index.ts"), //默认入口文件
  appBuild: resolveApp("build"), //指向打包后的输出目录 webpack默认是dist 这里是build
  appPublic: resolveApp("public"), //公共文件
  resolveApp,
};
