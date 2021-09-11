import * as express from "express";
import CountryContreller from "./country_controller";
import CountryService from "./country_service";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

export default class CountryRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const countryService: CountryService = new CountryService(
      resources.databaseConnection
    );
    const countryController: CountryContreller = new CountryContreller(
      countryService
    );
    app.get("/country", countryController.getAll.bind(countryController));
    app.get("/country/:id", countryController.getById.bind(countryController));
    app.post("/country", countryController.add.bind(countryController));
    app.put("/country/:id", countryController.edit.bind(countryController));
  }
}
