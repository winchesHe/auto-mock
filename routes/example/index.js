'use strict'

module.exports = async function (fastify, _opts) {
  fastify.get('/', async (_request, _reply) => {
    return 'this is an example'
  })
}
