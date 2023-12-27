const fastify = require('fastify')()

fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root:edgar@localhost:3306/OpenBanking'
})
async function routes(app, options) {
    app.get("/", async (request, response) => {
        fastify.mysql.query(
            'SELECT * from products',
            function onResult (err, response) {
              reply.send(err || response)
            }
          )
    });
  }
  
  module.exports = routes;