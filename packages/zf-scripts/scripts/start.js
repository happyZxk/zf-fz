/**
 * 1. 设置环境变量
 *
 */
process.env.NODE_ENV = "development";
const chalk = require("chalk");
const webpack = require("webpack");
// 2. 获取webpack的config文件
const configFactory = require("../config/webpack.config");

const config = configFactory("development");
// 3 创建compiler
const compiler = webpack(config);
const WebpackDevServer = require("webpack-dev-server");
const createDevServerConfig = require("../config/webpack-dev-server.config");
const serverConfig = createDevServerConfig();
const devServer = new WebpackDevServer(
  { ...serverConfig, open: true, port: 3000 },
  compiler
);

const runServer = async () => {
  console.log("Starting server...");
  await devServer.start();
};

runServer();
