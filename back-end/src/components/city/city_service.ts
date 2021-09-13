import BaseService from "../../services/BaseService";
import CityModel from "./city_model";
import CountryModel from "../country/country_model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddCity } from "./dto/AddCity";
import { IEditCity } from "./dto/EditCity";

class CityModelOptions {
  loadCountry: boolean = false;
}
class CityService extends BaseService<CityModel> {
  protected async adaptModel(
    data: any,
    options: Partial<CityModelOptions>
  ): Promise<CityModel> {
    const item: CityModel = new CityModel();

    item.city_id = +data?.city_id;
    item.name = data?.name;
    item.countryId = +data?.country_id;

    if (options.loadCountry && item.countryId) {
      const result = await this.services.countryService.getById(item.countryId);

      if (result instanceof CountryModel) {
        item.country = result;
      }
    }

    return item;
  }

  public async getById(
    cityId: number,
    options: Partial<CityModelOptions> = {}
  ): Promise<CityModel | null | IErrorResponse> {
    return await this.getIdFromTable("city", cityId, options);
  }

  public async getAllByCountryId(
    countryId: number,
    options: Partial<CityModelOptions | IErrorResponse> = {}
  ): Promise<CityModel[] | IErrorResponse> {
    return await this.getAllByFieldNameFromTable(
      "city",
      "country_id",
      countryId,
      options
    );
  }

  public async add(data: IAddCity): Promise<CityModel | IErrorResponse> {
    return new Promise<CityModel | IErrorResponse>(async (resolve) => {
      const sql = "INSERT city SET name = ?, country_id = ?";
      this.db
        .execute(sql, [data.name, data.countryId])
        .then(async (result) => {
          const info: any = result[0];

          const newCityId: number = +info?.insertId;

          resolve(await this.getById(newCityId));
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
    cityId: number,
    data: IEditCity,
    options: Partial<CityModelOptions> = {}
  ): Promise<CityModel | IErrorResponse | null> {
    const result = await this.getById(cityId);

    if (result === null) {
      return null;
    }
    if (!(result instanceof CityModel)) {
      return result;
    }
    return new Promise<CityModel | IErrorResponse>(async (resolve) => {
      const sql = "UPDATE city SET name = ? WHERE city_id = ?";
      this.db
        .execute(sql, [data.name, cityId])
        .then(async (result) => {
          resolve(await this.getById(cityId, options));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  public async delete(cityId: number): Promise<IErrorResponse> {
    return new Promise<IErrorResponse>((resolve) => {
      const sql = "DELETE FROM city WHERE city_id = ?;";
      this.db
        .execute(sql, [cityId])
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

export default CityService;
