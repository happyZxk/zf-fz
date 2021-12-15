#!/usr/bin/env node

/**
 * 开启子进程的包
 */
const spawn = require("cross-spawn");

const args = process.argv.slice(2);
const script = args[0];
// 以同步方式开始子进程执行scripts下面的;build.js
console.log(`args`, args);
console.log(`script`, script);
spawn.sync(
  process.execPath, //node 可执行文件路径
  [require.resolve("../scripts/" + script)],
  {
    stdio: "inherit", //和父进程共享输出
  }
);
