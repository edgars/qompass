
  async function routes(app, options) {
    app.get("/", (request, reply) => {
      return new Promise((resolve, reject) => {
        app.mysql.query('SELECT product_id, product_master, product_name, product_details from products', (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })
      .then(result => reply.send(result))
      .catch(err => reply.status(500).send({ error: 'Database query failed' }));
    });
  }  
  
module.exports = routes;