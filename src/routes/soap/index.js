const cepSchema = {
    params: {
      type: "object",
      properties: {
        cep: { type: "string", minLength: 8, maxLength: 8 },
      },
      required: ["cep"],
    },
  };
  
  async function routes(app, options) {
    app.get("/:cepparam", cepSchema, async (request, response) => {
      const { cepparam } = request.params;
      console.log("Informed CEP: " + cepparam);
  
      return new Promise((resolve, reject) => {
        app.soapClient.consultaCEP(
          { cep: cepparam },
          async function (err, result) {
            console.log(result);
            resolve(result);
          }
        );
      })
        .then((result) => response.status(200).send(result.return))
        .catch((err) =>
          response.status(500).send({ error: "Database query failed" })
        );
    });
  }
  
  module.exports = routes;