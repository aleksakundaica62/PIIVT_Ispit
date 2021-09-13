import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import AdminController from "./admin_controller";
export default class AdminRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const adminController: AdminController = new AdminController(resources);

    app.get("/administrator", adminController.getAll.bind(adminController));
    app.get(
      "/administrator/:id",
      adminController.getById.bind(adminController)
    );
    app.post("/administrator", adminController.add.bind(adminController));
    app.put("/administrator/:id", adminController.edit.bind(adminController));
  }
}
