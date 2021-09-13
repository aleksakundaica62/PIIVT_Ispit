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
    const tempController: TemperatureController = new TemperatureController(
      resources
    );

    app.get("/tempetature/:id", tempController.getById.bind(tempController));
    app.post("/tempetature", tempController.add.bind(tempController));
    app.put("/tempetature/:id", tempController.edit.bind(tempController));
    app.delete("/tempetature/:id", tempController.delete.bind(tempController));
  }
}
