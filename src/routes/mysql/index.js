async function routes(app, options) {
    app.get("/", async (request, response) => {
      try {
        const result = await app.mysql.query('SELECT * from products');
        response.send(result);
      } catch (err) {
        // Properly handle the error, for example, send a 500 status code
        response.status(500).send({ error: 'Database query failed' });
      }
    });
  }
  
  module.exports = routes;