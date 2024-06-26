const { join, resolve } = require('node:path')
const { existsSync } = require('node:fs')
const { scanDirFile } = require('@winches/utils')
const { getOptions } = require('../src/utils')
const { runDir } = require('../src/constants')

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, _options) {
  const { mockPath } = getOptions()
  const absMockPath = mockPath && resolve(runDir, mockPath)

  let mockDir = process.argv[2]
  if (!existsSync(absMockPath)) {
    console.log()
    console.log(`Warming: 当前配置mock路径${absMockPath}不存在`)
    console.log('切换至默认路径：__mock__')
  }
  else
    mockDir = absMockPath

  const mockList = scanDirFile(mockDir)
    .map(path => path.slice(path.indexOf(mockDir) + mockDir.length))
    .map(path => path.replace(/\..*/g, ''))

  fastify.get('/', async (_request, _reply) => {
    return { hello: 'world' }
  })

  console.log()
  console.log(`已获取mock路径：${mockList}`)
  console.log()

  let newItem = ''
  for (const item of mockList) {
    newItem = item.replace(/\\/g, '\/')
    // 判断是否为动态路径
    if (newItem.includes('.dynamic')) {
      const path = newItem.replace('.dynamic', '/:')
      addRoutes(path, item)
      continue
    }
    addRoutes(newItem, item)
  }

  function addRoutes(url, name) {
    fastify.get(url, async (request, _reply) => {
      return require(join(mockDir, `${name}.js`))(request, request.query, request.body)
    })
    fastify.post(url, async (request, _reply) => {
      return require(join(mockDir, `${name}.js`))(request, request.query, request.body)
    })
  }
}

module.exports = routes
