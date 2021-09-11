import CountryModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddCountry } from "./dto/AddCountry";
import BaseService from "../../services/BaseService";

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
    // const sql: string = "SELECT * FROM country WHERE country_id = ?;";
    // const [rows, columns] = await this.db.execute(sql, [countryId]);

    // if (!Array.isArray(rows)) {
    //   return null;
    // }
    // if (rows.length === 0) {
    //   return null;
    // }

    // return await this.adaptModel(rows[0]);

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
}

export default CountryService;
