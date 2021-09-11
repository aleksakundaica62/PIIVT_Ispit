import CountryModel from "./model";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../../common/IErrorResponse.interface";

class CountryService {
  constructor(private db: mysql2.Connection) {}

  protected async adaptModel(row: any): Promise<CountryModel> {
    const item: CountryModel = new CountryModel();

    item.country_id = +row?.country_id;
    item.name = row?.name;

    return item;
  }
  public async getAll(): Promise<CountryModel[] | IErrorResponse> {
    return new Promise<CountryModel[] | IErrorResponse>(async (resolve) => {
      const sql: string = "SELECT * FROM country;";
      this.db
        .execute(sql)
        .then(async (result) => {
          const rows = result[0];
          const lista: CountryModel[] = [];

          if (Array.isArray(rows)) {
            for (let row of rows) {
              lista.push(await this.adaptModel(row));
            }
          }
          resolve(lista);
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
  public async getById(countryId: number): Promise<CountryModel> | null {
    const sql: string = "SELECT * FROM country WHERE country_id = ?;";
    const [rows, columns] = await this.db.execute(sql, [countryId]);
    let country: CountryModel = new CountryModel();

    if (!Array.isArray(rows)) {
      return null;
    }
    if (rows.length === 0) {
      return null;
    }

    return await this.adaptModel(rows[0]);
  }

  //public async add(data: IAddCountry): Promise<CountryModel | null> {}
}

export default CountryService;
