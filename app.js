const fastify = require('fastify')({
    logger: true,
});
// fastify.register(require('fastify-cors'), {
//     // put your options here
// });

fastify.register(require('./routes'));

fastify.listen(process.env.PORT || 8080, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
