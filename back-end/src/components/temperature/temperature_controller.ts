import { NextFunction, Request, Response } from "express";
import BaseController from "../../common/BaseController";
import {
  IAddTemperature,
  IAddTemperatureValidator,
} from "./dto/AddTemperature";
import {
  IEditTemperature,
  IEditTemperatureValidator,
} from "./dto/EditTemperature";
import TemperatureModel from "./temperature_model";

class TemperatureController extends BaseController {
  public async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = +req.params?.id;

    if (id <= 0) {
      res.sendStatus(400);
      return;
    }

    const item = await this.services.tempService.getById(id);

    if (item === null) {
      res.sendStatus(404);
      return;
    }
    res.send(item);
  }

  public async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddTemperatureValidator(data)) {
      res.status(404).send(IAddTemperatureValidator.errors);
      return;
    }
    const result = await this.services.tempService.add(data as IAddTemperature);
    res.send(result);
  }
  async edit(req: Request, res: Response) {
    let id: string = req.params.id;
    let tempId: number = +id;
    const data = req.body;

    if (tempId <= 0) {
      res.sendStatus(400);
    }

    if (!IEditTemperatureValidator(data)) {
      res.status(404).send(IEditTemperatureValidator.errors);
      return;
    }
    const result = await this.services.tempService.getById(tempId);
    console.log(result);

    if (result === null) {
      res.sendStatus(404);
      return;
    }
    if (!(result instanceof TemperatureModel)) {
      res.sendStatus(500).send(result);
      return;
    }

    res.send(
      await this.services.tempService.edit(tempId, data as IEditTemperature)
    );
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let tempId: number = +id;

    if (tempId <= 0) {
      res.sendStatus(400);
      return;
    }
    res.send(await this.services.tempService.delete(tempId));
  }
}

export default TemperatureController;
