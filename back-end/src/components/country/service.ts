import { IAddCountry } from "./dto/addCountry";
import CountryModel from "./model";
import * as mysql2 from "mysql2/promise";

class CountryService {
  constructor(private db: mysql2.Connection) {}

  protected async adaptModel(row: any): Promise<CountryModel> {
    const item: CountryModel = new CountryModel();

    item.country_id = +row?.country_id;
    item.name = row?.name;

    return item;
  }
  public async getAll(): Promise<CountryModel[]> {
    const lista: CountryModel[] = [];

    const sql: string = "SELECT * FROM country;";
    const [rows, columns] = await this.db.execute(sql);

    if (Array.isArray(rows)) {
      for (let row of rows) {
        lista.push(await this.adaptModel(row));
      }
    }

    return lista;
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
