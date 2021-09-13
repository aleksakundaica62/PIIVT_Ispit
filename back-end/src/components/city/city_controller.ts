import { NextFunction, Request, Response } from "express";
import CityService from "./city_service";
import CityModel from "./city_model";
import { IAddCity, IAddCityValidator } from "./dto/AddCity";
import { IEditCity, IEditCityValidator } from "./dto/EditCity";
import BaseController from "../../common/BaseController";
class CityController extends BaseController {
  public async getById(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let cityId: number = +id;

    if (cityId <= 0) {
      res.sendStatus(400);
      return;
    }
    const result = await this.services.cityService.getById(cityId, {
      loadCountry: true,
    });

    if (result === null) {
      res.sendStatus(400);
      return;
    }

    if (result instanceof CityModel) {
      res.send(result);
      console.log(result);
      return;
    }

    res.status(500).send(result);
  }

  public async getAllInCountry(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let countryId: number = +req.params.cid;

    res.send(await this.services.cityService.getAllByCountryId(countryId));
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddCityValidator(data)) {
      res.status(404).send(IAddCityValidator.errors);
      return;
    }

    const result = await this.services.cityService.add(data as IAddCity);
    res.send(result);
  }

  async edit(req: Request, res: Response) {
    let id: string = req.params.id;
    let cityId: number = +id;
    const data = req.body;

    if (cityId <= 0) {
      res.sendStatus(400);
    }

    if (!IEditCityValidator(data)) {
      res.status(404).send(IEditCityValidator.errors);
      return;
    }
    const result = await this.services.cityService.getById(cityId);
    console.log(result);

    if (result === null) {
      res.sendStatus(404);
      return;
    }
    if (!(result instanceof CityModel)) {
      res.sendStatus(500).send(result);
      return;
    }

    res.send(
      await this.services.cityService.edit(cityId, data as IEditCity, {
        loadCountry: true,
      })
    );
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let cityId: number = +id;

    if (cityId <= 0) {
      res.sendStatus(400);
      return;
    }
    res.send(await this.services.cityService.delete(cityId));
  }
}

export default CityController;
