import * as express from "express";
import CountryContreller from "./country_controller";
import CountryService from "./country_service";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthMiddleware from "../../midleware/auth.middleware";

export default class CountryRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const countryController: CountryContreller = new CountryContreller(
      resources
    );
    app.get(
      "/country",
      AuthMiddleware.verifyAuthToken,
      countryController.getAll.bind(countryController)
    );
    app.get(
      "/country/:id",
      AuthMiddleware.verifyAuthToken,
      countryController.getById.bind(countryController)
    );
    app.post(
      "/country",
      AuthMiddleware.verifyAuthToken,
      countryController.add.bind(countryController)
    );
    app.put(
      "/country/:id",
      AuthMiddleware.verifyAuthToken,
      countryController.edit.bind(countryController)
    );
    app.delete(
      "/country/:id",
      AuthMiddleware.verifyAuthToken,
      countryController.delete.bind(countryController)
    );
  }
}
