
  async function routes(app, options) {
    app.get("/", (request, reply) => {
      return new Promise((resolve, reject) => {
        app.mysql.query('SELECT customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine2, city state, postalCode, country, salesRepEmployeeNumber, creditLimit FROM classicmodels.customers;', (err, result) => {
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