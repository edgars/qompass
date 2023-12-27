const fastify = require("fastify");
const app = fastify({ logger: true });

app.register(require('@fastify/mysql'), {
  connectionString: 'mysql://root:mysql@localhost:3306/OpenBanking'
})
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8000;

app.register(require("./routes/ping"), { prefix: "/ping" });
app.register(require("./routes/mysql"), { prefix: "/customers" });



app.listen({ port: port }, (err) => {
  if (err) {
    // fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }

  console.log("=".repeat(30));
  console.log("Qompas - Integration Framework ")
  console.log(`Server running on port ${port}`);
  console.log("=".repeat(30));
});
