import { NextFunction, Request, Response } from "express";
import { IAddCountry, IAddCountryValidator } from "./dto/AddCountry";
import CountryModel from "./country_model";
import CountryService from "./country_service";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IEditCountry, IEditCountryValidator } from "./dto/EditCountry";

class CountryContreller {
  constructor(private countryService: CountryService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    const countries = await this.countryService.getAll();

    res.send(countries);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;
    let countryId: number = +id;

    if (countryId <= 0) {
      res.sendStatus(400);
    }
    const country: CountryModel | null | IErrorResponse =
      await this.countryService.getById(countryId);

    if (country === null) {
      res.sendStatus(404);
      return;
    }

    res.send(country);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (!IAddCountryValidator(data)) {
      res.status(404).send(IAddCountryValidator.errors);
      return;
    }

    const result = await this.countryService.add(data as IAddCountry);
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
    const result = await this.countryService.edit(
      countryId,
      data as IEditCountry
    );
    if (result === null) {
      res.sendStatus(404);
      return;
    }

    res.send(result);
  }
}

export default CountryContreller;
