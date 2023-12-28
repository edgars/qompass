const jsforce = require('jsforce');

const conn = new jsforce.Connection({
    // If you're using a sandbox, change to https://test.salesforce.com
    loginUrl: 'https://login.salesforce.com' 
  });

// Connect to Salesforce
async function connectSalesforce() {
    try {
      await conn.login('edgar@skalena.com', 'Qompass@123' + 'ugLG4oTIso4wyN5ZmNo9MpDq');
      console.log("Connected to Salesforce");
    } catch (error) {
      console.error("Salesforce connection error:", error);
    }
  }  

async function routes(app, options) {
    connectSalesforce();
    app.get("/", async (request, response) => {
        try {
            const soql = 'SELECT Id, Name, Industry FROM Account LIMIT 10'; // Example SOQL query
            const result = await conn.query(soql);
            response.send(result.records);
          } catch (error) {
            response.status(500).send('Error fetching data from Salesforce');
          }
    });
  }
  
  module.exports = routes;