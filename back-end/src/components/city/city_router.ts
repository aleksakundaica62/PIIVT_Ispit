import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import CityController from "./city_controller";

export default class CityRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const cityController: CityController = new CityController(resources);

    app.get("/city/:id", cityController.getById.bind(cityController));
    app.get(
      "/country/:cid/city",
      cityController.getAllInCountry.bind(cityController)
    );
    app.post("/city", cityController.add.bind(cityController));
    app.put("/city/:id", cityController.edit.bind(cityController));
    app.delete("/city/:id", cityController.delete.bind(cityController));
  }
}
