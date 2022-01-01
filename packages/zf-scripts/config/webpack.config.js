const paths = require("./paths");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * 生成webpack配置文件工厂
 * @param {*} webpackEnv 环境信息 development production
 */
module.exports = function (webpackEnv) {
  //TODO: 可能需要自定义配置的属性
  const staticPath = "static";
  const alias = {};
  const extensions = [".tsx", ".ts", ".mjs", ".js", ".jsx", ".json"];
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
          // exclude: /node_modules/,
          use: [
            // 'cache-loader',
            {
              loader: "ts-loader",
              options: {
                // 是否关闭静态资源检测
                // 设置 true 可以让打包速度变快一倍
                transpileOnly: true,
                // //使用ts-import-plugin保证antd可以按需加载
                getCustomTransformers: () => ({
                  before: [
                    tsImportPluginFactory([
                      {
                        libraryName: "@arco-design/web-react",
                        libraryDirectory: "es",
                        camel2DashComponentName: false,
                        style: true, // 样式按需加载
                      },
                    ]),
                  ],
                }),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        // 第三方less文件打包成css
        {
          test: /\.less$/,
          include: [
            paths.resolveApp("node_modules"),
            paths.resolveApp("../../node_modules"),
          ],
          use: [
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     filename: "[name].css",
            //     chunkFilename: "[id].css",
            //   },
            // },
            "style-loader",
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        // 自定义样式打包成 style 插入页面
        {
          test: /\.less$/,
          include: [paths.appSrc],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: `[name]__[local]-[${hasType}:base64:5]`,
                },
              },
            },
            {
              loader: "less-loader",
              options: {
                modules: true,
                javascriptEnabled: true,
                localIdentName: `[local]--[${hasType}:base64:5]`,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          // More information here https://webpack.js.org/guides/asset-modules/
          type: "asset",
        },
      ],
    },
    // devServer: {
    //   port: port,
    //   hot: true,
    //   inline: true,
    //   progress: true,
    //   host: "0.0.0.0",
    //   contentBast: appBuild,
    //   historyApiFallback: true,
    //   disabledHostCheck: true,
    //   proxy: {},
    //   headers: { "Access-Control-Allow-Origin": "*" },
    //   // publicPath,
    // },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({ inject: "body", template: paths.appHtml }),
      new MiniCssExtractPlugin(),
    ],
  };
};
