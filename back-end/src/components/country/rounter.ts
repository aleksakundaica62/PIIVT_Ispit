import * as express from "express";
import CountryContreller from "./controller";
import CountryService from "./service";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRoutrer from "../../common/IRouter.interface";
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
  }
}
