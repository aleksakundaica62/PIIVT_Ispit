import * as express from "express";
import CountryContreller from "./controller";
import CountryService from "./service";

export default class CountryRouter {
  public static setupRoutes(app: express.Application) {
    const countryService: CountryService = new CountryService();
    const countryController: CountryContreller = new CountryContreller(
      countryService
    );
    app.get("/country", countryController.getAll.bind(countryController));
    app.get("/country/:id", countryController.getById.bind(countryController));
  }
}
