const paths = require("./paths");

/**
 * 生成webpack配置文件工厂
 * @param {*} webpackEnv 环境信息 development production
 */
module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    output: {
      path: paths.appBuild,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: paths.appIndexJs,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
  };
};
