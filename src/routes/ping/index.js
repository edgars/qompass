async function routes(app, options) {
    app.get("/", async (request, response) => {
      response.header('X-Qompass-Completed', 'true');
      return response.status(200).send({message: "Hello"});
    });
  }
  
  module.exports = routes;
  