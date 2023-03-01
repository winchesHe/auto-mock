const { resolve } = require('path')
const { runDir } = require('../constants/index.js')

function getOptions() {
  const opts = resolve(runDir, 'mock.config.js') || resolve(runDir, 'mock.config.cjs')
    || require(resolve(runDir, 'package.json')) || undefined
  const { mockPath, watch, port } = opts && require(opts)

  return {
    mockPath,
    watch,
    port
  }
}

module.exports = {
  getOptions
}