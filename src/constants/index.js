const { resolve } = require('path')

const root = resolve(__dirname, '../..')
const runDir = process.cwd()

module.exports = {
  root,
  runDir
}