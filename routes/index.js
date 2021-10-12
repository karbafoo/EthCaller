async function routes(fastify, options) {
    fastify.register(require('./call'), {prefix: '/call'});
    fastify.register(require('./send'), {prefix: '/send'});
}

module.exports = routes;
