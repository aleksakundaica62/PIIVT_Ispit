import { NextFunction, Request, Response } from "express";
import CountryModel from "./model";
import CountryService from "./service";

class CountryContreller {
  constructor(private countryService: CountryService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    const countries = await this.countryService.getAll();

    res.send(countries);
  }
}

export default CountryContreller;
