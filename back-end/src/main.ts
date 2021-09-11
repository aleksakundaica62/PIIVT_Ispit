import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import IConfig from "./config/IConfig.interface";
import CountryService from "./components/country/service";
import CountryContreller from "./components/country/controler";

const application: express.Application = express();

application.use(cors());
application.use(express.json());

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
const countryService: CountryService = new CountryService();
const countryController: CountryContreller = new CountryContreller(
  countryService
);

application.get("/country", countryController.getAll.bind(countryController));
application.get(
  "/country/:id",
  countryController.getById.bind(countryController)
);

application.use((req, res) => {
  res.sendStatus(404);
});

application.listen(Config.server.port);
