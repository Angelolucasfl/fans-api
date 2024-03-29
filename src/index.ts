import server from "./server/Server";
import { Knex } from "./server/database/knex";

const startServer = () => {
  server.listen(process.env.PORT || 8000, () => 
    console.log(`server runing on http://127.0.0.1:${process.env.PORT || 8000}`));
};

if (process.env.IS_LOCALHOST !== "true") {
  server.listen(process.env.PORT || 8000, () => console.log(`server runing on http://127.0.0.1:${process.env.PORT || 8000}/api-docs`));
  Knex.migrate.latest().then(() => {
    Knex.seed.run().then(() => startServer())
      .catch(console.log);
  })
    .catch(console.log);
} else {
  startServer();
}

