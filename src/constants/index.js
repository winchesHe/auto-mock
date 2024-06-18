const { resolve } = require('node:path')

const root = resolve(__dirname, '../..')
const runDir = process.cwd()

module.exports = {
  root,
  runDir,
}
