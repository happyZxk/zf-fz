const paths = require("./paths");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { appBuild } = require("./paths");
const ArcoWebpackPlugin = require("@arco-design/webpack-plugin");
/**
 * 生成webpack配置文件工厂
 * @param {*} webpackEnv 环境信息 development production
 */
module.exports = function (webpackEnv) {
  //TODO: 可能需要自定义配置的属性
  const staticPath = "static";
  const alias = {};
  const extensions = [".mjs", ".ts", ".tsx", ".js", ".jsx", ".json"];
  const debug = false;
  const port = 8080;
  console.log(`paths`, paths);

  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const hasType = debug ? "hash" : "contenthash";
  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: paths.appIndexTs,
    output: {
      filename: `${staticPath}/js/[name].[${hasType}:8].js`,
      path: paths.appBuild,
    },
    resolve: {
      symlinks: false,
      extensions, //尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
      alias: {
        "@": paths.appSrc,
        ...alias,
      },
    },
    devtool: "eval-cheap-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },

          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  strictMath: true,
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      port: port,
      hot: true,
      inline: true,
      progress: true,
      host: "0.0.0.0",
      contentBast: appBuild,
      historyApiFallback: true,
      disabledHostCheck: true,
      proxy: {},
      headers: { "Access-Control-Allow-Origin": "*" },
      // publicPath,
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({ inject: "body", template: paths.appHtml }),
      new ArcoWebpackPlugin(),
    ],
  };
};
