import CountryModel from "./country_model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddCountry } from "./dto/AddCountry";
import BaseService from "../../services/BaseService";
import { IEditCountry } from "./dto/EditCountry";
import IModelAdapterOptions from "../../common/IModelAdapterOptions.interface";
import CityModel from "../city/city_model";

class CountryModelAdapterOptions {
  loadCities: boolean = false;
}
class CountryService extends BaseService<CountryModel> {
  protected async adaptModel(
    row: any,
    options: Partial<CountryModelAdapterOptions> = {}
  ): Promise<CountryModel> {
    const item: CountryModel = new CountryModel();

    item.countryId = +row?.country_id;
    item.name = row?.name;

    if (options.loadCities) {
      const result = await this.services.cityService.getAllByCountryId(
        item.countryId
      );
      if (Array.isArray(result)) {
        item.cities = result;
      }
    }

    return item;
  }
  public async getAll(
    options: Partial<CountryModelAdapterOptions> = {}
  ): Promise<CountryModel[] | IErrorResponse> {
    return await this.getAllFromTable("country", options);
  }
  public async getById(
    countryId: number,
    options: Partial<CountryModelAdapterOptions> = {}
  ): Promise<CountryModel | IErrorResponse | null> {
    return await this.getIdFromTable("country", countryId, options);
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
  public async delete(countryId: number): Promise<IErrorResponse> {
    return new Promise<IErrorResponse>((resolve) => {
      const sql = "DELETE FROM country WHERE country_id = ?;";
      this.db
        .execute(sql, [countryId])
        .then(async (result) => {
          const deleteInfo: any = result[0];
          const deletedRows: number = +deleteInfo?.affectedRows;
          console.log(result);

          if (deletedRows === 1) {
            resolve({
              errorCode: 0,
              errorMessage: "Country deleted",
            });
          } else {
            resolve({
              errorCode: -1,
              errorMessage: "Could not be deleted.",
            });
          }
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
