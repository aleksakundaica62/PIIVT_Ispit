import CountryModel from "./country_model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddCountry } from "./dto/AddCountry";
import BaseService from "../../services/BaseService";
import { IEditCountry } from "./dto/EditCountry";

class CountryService extends BaseService<CountryModel> {
  protected async adaptModel(row: any): Promise<CountryModel> {
    const item: CountryModel = new CountryModel();

    item.country_id = +row?.country_id;
    item.name = row?.name;

    return item;
  }
  public async getAll(): Promise<CountryModel[] | IErrorResponse> {
    return await this.getAllFromTable("country");
  }
  public async getById(
    countryId: number
  ): Promise<CountryModel | IErrorResponse | null> {
    return await this.getIdFromTable("country", countryId);
  }

  public async add(data: IAddCountry): Promise<CountryModel | IErrorResponse> {
    return new Promise<CountryModel | IErrorResponse>(async (resolve) => {
      const sql = "INSERT country SET name = ?";
      this.db
        .execute(sql, [data.name ?? null])
        .then(async (result) => {
          const [info]: any = result;

          const newCountryId: number = +info?.insertId;

          resolve(await this.getById(newCountryId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
  public async edit(
    countryId: number,
    data: IEditCountry
  ): Promise<CountryModel | IErrorResponse | null> {
    const result = await this.getById(countryId);

    if (result === null) {
      return null;
    }
    if (!(result instanceof CountryModel)) {
      return result;
    }
    return new Promise<CountryModel | IErrorResponse>(async (resolve) => {
      const sql = "UPDATE country SET name = ? WHERE country_id = ?";
      this.db
        .execute(sql, [data.name, countryId])
        .then(async (result) => {
          resolve(await this.getById(countryId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
}

export default CountryService;
