import { NextFunction, Request, Response } from "express";
import TemperatureService from "./temperature_service";
import TemperatureModel from "./temperature_model";

class TemperatureController {
  constructor(private tempService: TemperatureService) {}

  public async getById(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let tempid: number = +id;

    if (tempid <= 0) {
      res.sendStatus(400);
      return;
    }
    const result = await this.tempService.getById(tempid, {
      loadCity: true,
    });

    if (result === null) {
      res.sendStatus(400);
      return;
    }

    if (result instanceof TemperatureModel) {
      res.send(result);
      return;
    }
    res.status(500).send(result);
  }
}

export default TemperatureController;
