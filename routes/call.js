const {callFunc} = require('../helpers/Abi.helper');
async function routes(fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/:addr/:fn/:params',
        handler: CallContract,
    });
    fastify.route({
        method: 'GET',
        url: '/:addr/:fn',
        handler: CallContract,
    });
}

module.exports = routes;

const CallContract = async (request, reply) => {
    try {
        console.log('request.params', request.query);
        const {apiKey} = request.query;
        if (!apiKey) throw new Error('apiKey required');
        const data = await callFunc(apiKey, request.params);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        reply.send({err: err.message || 'ERROR'});
    }
};
