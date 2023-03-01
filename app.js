const { getOptions } = require('./src/utils/index.js')

const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.register(require('./routes/index.js'))

// Run the server!
let { port } = getOptions()
let regPort = process.argv[process.argv.length-1].match(/\d+/g)
port = port || (regPort && regPort[0]) || 5050
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})