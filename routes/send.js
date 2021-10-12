async function routes(fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/:addr/:fn/:params',
        handler: CallContract,
    });
}

module.exports = routes;

const CallContract = async (request, reply) => {
    try {
        console.log('request.body\n\n\n', request.body);
        const data = await ListController.MakeList(request.user, request.body);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
