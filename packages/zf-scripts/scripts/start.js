/**
 * 1. 设置环境变量
 *
 */
process.env.NODE_ENV = "development";
const fs = require("fs-extra");
const chalk = require("chalk");
const paths = require("../config/paths");
const webpack = require("webpack");
// 2. 获取webpack的config文件
const configFactory = require("../config/webpack.config");

const config = configFactory("production");
// 3.如果build目录不为空，要把build目录清空
fs.emptyDirSync(paths.appBuild);
// 4. 拷贝public下面的静态文件到build目录下
build();

function build() {
  //compiler 是总的编译对象
  let compiler = webpack(config);
  // 开启编译
  compiler.run((err, stats) => {
    stats.hasErrors();
    const info = stats.toJson();

    if (err) {
      console.error(info.errors);
    } else if (stats.hasErrors()) {
      console.error(info.errors);
    } else {
      console.log(chalk.green("Compiled successfully"));
    }
  });
}
