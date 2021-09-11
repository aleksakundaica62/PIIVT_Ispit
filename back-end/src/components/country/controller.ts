import { NextFunction, Request, Response } from "express";
import CountryModel from "./model";
import CountryService from "./service";

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
    const country: CountryModel | null = await this.countryService.getById(
      countryId
    );

    if (country === null) {
      res.sendStatus(404);
      return;
    }

    res.send(country);
  }
}

export default CountryContreller;
