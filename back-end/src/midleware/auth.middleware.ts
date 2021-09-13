import { NextFunction, Request, Response, response } from "express";
import * as jwt from "jsonwebtoken";
import Config from "../config/dev";
import ITokenData from "../components/auth/dto/ITokenData.interface";

export default class AuthMiddleware {
  public static verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (typeof req.headers.authorization !== "string") {
      return res.status(401).send("No token type");
    }

    const token: string = req.headers.authorization;
    const [tokenType, tokenString] = token.trim().split(" ");
    console.log(token);

    if (tokenType !== "Bearer") {
      return res.status(400).send("Invalid token type");
    }

    if (typeof tokenString !== "string" || tokenString.length === 0) {
      return res.status(400).send("Invalid token string");
    }

    let result;

    try {
      result = jwt.verify(tokenString, Config.auth.admin.auth.public);
    } catch (e) {
      return res.status(500).send("Token validation error " + e.message);
    }

    if (typeof result !== "object") {
      return res.status(400).send("Bad req");
    }

    const data: ITokenData = result as ITokenData;

    req.authorized = data;

    next();
  }
}
