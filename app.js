const { getOptions } = require('./src/utils/index.js')

const fastify = require('fastify')({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname,level,req.remoteAddress,req.remotePort,reqId',
      },
      serializers: {
        res (reply) {
          // The default
          return {
            statusCode: reply.statusCode,
          }
        },
      }
    }
  }
})

// Declare a route
fastify.register(require('./routes/index.js'))

// Run the server!
let { port } = getOptions()
let regPort = process.argv[process.argv.length - 1].match(/\d+/g)
port = port || (regPort && regPort[0]) || 5050
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  // 打印已添加的全部路由
  console.log(fastify.printRoutes());
  // Server is now listening on ${address}
})