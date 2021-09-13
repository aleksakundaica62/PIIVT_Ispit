import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import CountryRouter from "./components/country/country_router";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources.interface";
import Router from "./router";
import CityRouter from "./components/city/city_router";
import CountryService from "./components/country/country_service";
import CityService from "./components/city/city_service";
import TemperatureRouter from "./components/temperature/temperature_router";
import TemperatureService from "./components/temperature/temperature_service";

async function main() {
  const application: express.Application = express();

  application.use(cors());
  application.use(express.json());

  const db = await mysql2.createConnection({
    host: Config.database.host,
    port: Config.database.port,
    user: Config.database.user,
    password: Config.database.password,
    database: Config.database.database,
    charset: Config.database.charset,
    timezone: Config.database.timezone,
  });

  const resources: IApplicationResources = {
    databaseConnection: db,
  };

  resources.databaseConnection.connect();

  resources.services = {
    countryService: new CountryService(resources),
    cityService: new CityService(resources),
    tempService: new TemperatureService(resources),
  };
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

  Router.setupRoutes(application, resources, [
    new CountryRouter(),
    new CityRouter(),
    new TemperatureRouter(),
  ]);

  application.use((req, res) => {
    res.sendStatus(404);
  });

  application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
  });

  application.listen(Config.server.port);
}

main();
