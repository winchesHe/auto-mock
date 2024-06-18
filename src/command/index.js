const { resolve, join } = require('node:path')
const execa = require('execa')
const { getOptions } = require('../utils')
const { runDir } = require('../constants')

async function start(options) {
  let { port = '', watch, mockPath } = getOptions()
  let mockDir = options.mockPath || mockPath || '__mock__'
  mockDir = resolve(runDir, mockDir)
  watch = options.watch || watch

  const appPath = join(__dirname, '../../app.js')
  const commonArgs = [
    appPath,
    mockDir,
  ]
  const watchFile = [
    mockDir,
    'app.js',
    'mock.*.js',
    'mock.*.cjs',
  ].reduce((pre, cur) => {
    pre.push('--watch', cur)
    return pre
  }, [])
  // 执行服务
  let subprocess
  // 执行参数 npx nodemon app mock / node app mock
  if (watch)
    subprocess = execa('npx', [
      'nodemon',
      ...commonArgs,
      ...watchFile,
      port && `-p ${port}`,
    ])
  else
    subprocess = execa('node', [
      ...commonArgs,
      port && `-p ${port}`,
    ])

  subprocess.stdout.pipe(process.stdout)

  subprocess.catch((err) => {
    console.log(err)
  })
}

module.exports = {
  start,
}
