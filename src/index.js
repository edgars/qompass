const fastify = require("fastify");
const app = fastify({ logger: true });

/**
 * Global MySQL Connection to be injected in the app context
 */
app.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root:mysql@localhost:3306/OpenBanking'
})

/**
 * Global SOAP Server
 */
app.register(require('@fastify/soap-client'), {
  url: 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?WSDL'
})



const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8000;

app.register(require("./routes/ping"), { prefix: "/ping" });
app.register(require("./routes/mysql"), { prefix: "/customers" });
app.register(require("./routes/salesforce"), { prefix: "/salesforce" });
app.register(require("./routes/soap"), { prefix: "/cep" });


app.listen({ port: port }, (err) => {
  if (err) {
    // fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }

  console.log("=".repeat(30));
  console.log("🚀 Qcompas - Integration Framework ")
  console.log(`Server running on port ${port}`);
  console.log("=".repeat(30));
});
