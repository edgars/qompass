
const cepSchema = {
    params: {
        type: 'object',
        properties: {
            cep: { type: 'string', minLength: 8, maxLength: 8 }
        },
        required: ['cep']
    }
}

async function routes(app, options) {
    app.get("/:cepparam",cepSchema, async (request, response) => {
        const { cepparam } = request.params;
        console.log("Informed CEP: " + cepparam)
        try {
            app.soapClient.consultaCEP({ cep:cepparam }, function (err, result) {
                if (err) {
                    console.log("====>" + err);
                    response.header('X-Qompass-Completed', 'false');
                    return response.status(500).send( err)
                  
                } else {
                    response.header('X-Qompass-Completed', 'true');
                    return response.status(200).send(result.consultaCEPResponse)
                }
              })  
            
        } catch (error) {

            response.header('X-Qompass-Completed', 'false');
            return response.status(500).send( error)
            
        }
        
         
    });
  }
  
  module.exports = routes;
  