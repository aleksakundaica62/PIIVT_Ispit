import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import TemperatureService from "./temperature_service";
import TemperatureController from "./temperature_controller";

export default class TemperatureRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const tempService: TemperatureService = new TemperatureService(
      resources.databaseConnection
    );
    const tempController: TemperatureController = new TemperatureController(
      tempService
    );

    app.get("/temperature/:id", tempController.getById.bind(tempController));
  }
}
