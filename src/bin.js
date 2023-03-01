#!/usr/bin/env node
const pkg = require('../package.json')
const { start } = require('./command/index')
const { Command } = require('commander')


const program = new Command()
program.version(pkg.version, '-v --version', '显示当前版本号')

program
  .description('mock 服务')
  .option('-p, --path [mockPath]', 'mock服务的路径')
  .option('-w, --watch [watch]', '是否为watch模式')
  .action(start)

program.parse(process.argv)
