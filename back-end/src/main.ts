import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import CountryRouter from "./components/country/rounter";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources.interface";

async function main() {
  const application: express.Application = express();

  application.use(cors());
  application.use(express.json());

  const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
      host: Config.database.host,
      port: Config.database.port,
      user: Config.database.user,
      password: Config.database.password,
      database: Config.database.database,
      charset: Config.database.charset,
      timezone: Config.database.timezone,
    }),
  };

  resources.databaseConnection.connect();

  application.use(
    Config.server.static.route,
    express.static(Config.server.static.path, {
      index: Config.server.static.index,
      cacheControl: Config.server.static.cacheControl,
      maxAge: Config.server.static.maxAge,
      etag: Config.server.static.etag,
      dotfiles: Config.server.static.dotifles,
    })
  );

  CountryRouter.setupRoutes(application, resources);

  application.use((req, res) => {
    res.sendStatus(404);
  });

  application.listen(Config.server.port);
}

main();
