import IRouter from "../../common/IRouter.interface";
import * as express from "express";
import IApplicationResources from "../../common/IApplicationResources.interface";
import AuthController from "./auth_controller";
export default class AuthRouter implements IRouter {
  public setupRoutes(
    app: express.Application,
    resources: IApplicationResources
  ) {
    const adminController: AuthController = new AuthController(resources);

    app.post(
      "/auth/administrator/login",
      adminController.adminLogin.bind(adminController)
    );
  }
}
