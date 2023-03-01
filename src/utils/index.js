const { existsSync } = require('fs')
const { resolve } = require('path')
const { runDir } = require('../constants/index.js')

function getOptions() {
  function getOpts(path) {
    const absPath = resolve(runDir, path)
    if (!existsSync(absPath))
      return null
    return require(absPath)
  }
  const opts = getOpts('mock.config.js') || getOpts('mock.config.cjs')
    || getOpts('package.json') || undefined
  const { mockPath, watch, port } = opts

  return {
    mockPath,
    watch,
    port
  }
}

module.exports = {
  getOptions
}