import { Request, response, Response } from "express";
import BaseController from "../../common/BaseController";
import { IAdminLogin, IAdminLoginValidator } from "./dto/IAdminLogin";
import * as bcrypt from "bcrypt";
import ITokenData from "./dto/ITokenData.interface";
import * as jwt from "jsonwebtoken";
import Config from "../../config/dev";

export default class AuthController extends BaseController {
  public async adminLogin(req: Request, res: Response) {
    if (!IAdminLoginValidator(req.body)) {
      return res.status(404).send(IAdminLoginValidator.errors);
    }

    const data = req.body as IAdminLogin;

    const admin = await this.services.adminService.getByUsername(data.username);

    if (!admin.isActive) {
      return res.status(403).send("Admin is not active!");
    }

    if (admin === null) {
      return res.status(404);
    }

    if (!bcrypt.compareSync(data.password, admin.passwordHash)) {
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      return res.status(403);
    }

    const authTokenData: ITokenData = {
      id: admin.adminiId,
      identity: admin.username,
      role: "administrator",
    };
    const refreshTokenData: ITokenData = {
      id: admin.adminiId,
      identity: admin.username,
      role: "administrator",
    };
    const authToken = jwt.sign(authTokenData, Config.auth.admin.auth.private, {
      algorithm: Config.auth.admin.algorthm,
      issuer: Config.auth.admin.issuer,
      expiresIn: Config.auth.admin.auth.duration,
    });

    const refreshToken = jwt.sign(
      refreshTokenData,
      Config.auth.admin.refresh.private,
      {
        algorithm: Config.auth.admin.algorthm,
        issuer: Config.auth.admin.issuer,
        expiresIn: Config.auth.admin.refresh.duration,
      }
    );

    res.send({
      authToken: authToken,
      refreshToken: refreshToken,
    });
  }
}
