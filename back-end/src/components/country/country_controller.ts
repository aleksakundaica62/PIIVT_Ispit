import { NextFunction, Request, Response } from "express";
import { IAddCountry, IAddCountryValidator } from "./dto/AddCountry";
import CountryModel from "./country_model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IEditCountry, IEditCountryValidator } from "./dto/EditCountry";
import BaseController from "../../common/BaseController";

class CountryContreller extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const countries = await this.services.countryService.getAll();

    res.send(countries);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let countryId: number = +id;

    if (countryId <= 0) {
      res.sendStatus(400);
    }
    const country: CountryModel | null | IErrorResponse =
      await this.services.countryService.getById(countryId, {
        loadCities: true,
      });

    if (country === null) {
      res.sendStatus(404);
      return;
    }
    if (country instanceof CountryModel) {
      res.send(country);
      return;
    }

    res.status(500).send(country);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddCountryValidator(data)) {
      res.status(404).send(IAddCountryValidator.errors);
      return;
    }

    const result = await this.services.countryService.add(data as IAddCountry);
    res.send(result);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let countryId: number = +id;
    const data = req.body;

    if (countryId <= 0) {
      res.sendStatus(400);
    }

    if (!IEditCountryValidator(data)) {
      res.status(404).send(IEditCountryValidator.errors);
      return;
    }
    const result = await this.services.countryService.edit(
      countryId,
      data as IEditCountry
    );
    if (result === null) {
      res.sendStatus(404);
      return;
    }

    res.send(result);
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let countryId: number = +id;

    if (countryId <= 0) {
      res.sendStatus(400);
      return;
    }
    res.send(await this.services.countryService.delete(countryId));
  }
}

export default CountryContreller;
