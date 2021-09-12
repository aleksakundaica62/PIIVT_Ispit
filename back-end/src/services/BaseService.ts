import IModel from "../common/IModel.interface";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../common/IErrorResponse.interface";
import IModelAdapterOptions from "../common/IModelAdapterOptions.interface";
import IApplicationResources from "../common/IApplicationResources.interface";
import IServices from "../common/IServices.interface";
export default abstract class BaseService<T extends IModel> {
  constructor(private resources: IApplicationResources) {}

  protected get db(): mysql2.Connection {
    return this.resources.databaseConnection;
  }
  protected get services(): IServices {
    return this.resources.services;
  }

  protected abstract adaptModel(
    data: any,
    options: Partial<IModelAdapterOptions>
  ): Promise<T>;

  protected async getAllFromTable(
    tableName: string,
    options: Partial<IModelAdapterOptions>
  ): Promise<T[] | IErrorResponse> {
    return new Promise<T[] | IErrorResponse>(async (resolve) => {
      const sql: string = `SELECT * FROM ${tableName};`;
      this.db
        .execute(sql)
        .then(async (result) => {
          const rows = result[0];
          const lista: T[] = [];

          if (Array.isArray(rows)) {
            for (let row of rows) {
              lista.push(await this.adaptModel(row, options));
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

  protected async getIdFromTable<AdapterOptions extends IModelAdapterOptions>(
    tableName: string,
    id: number,
    options: Partial<AdapterOptions> = {}
  ): Promise<T | IErrorResponse | null> {
    return new Promise<T | IErrorResponse | null>(async (resolve) => {
      const sql: string = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;
      this.db
        .execute(sql, [id])
        .then(async (result) => {
          const [rows, columns] = result;

          if (!Array.isArray(rows)) {
            resolve;
            return;
          }

          if (rows.length === 0) {
            resolve(null);
            return;
          }
          resolve(await this.adaptModel(rows[0], options));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
  protected async getAllByFieldNameFromTable<
    AdapterOptions extends IModelAdapterOptions
  >(
    tableName: string,
    fieldName: string,
    fieldValue: any,
    options: Partial<AdapterOptions> = {}
  ): Promise<T[]> {
    return new Promise<T[]>(async (resolve) => {
      const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
      this.db
        .execute(sql, [fieldValue])
        .then(async (result) => {
          const rows = result[0];
          const lista: T[] = [];

          if (Array.isArray(rows)) {
            for (let row of rows) {
              lista.push(await this.adaptModel(row, options));
            }
          }
          resolve(lista);
        })
        .catch((error) => {
          console.log(error.message);

          resolve(error.message);
        });
    });
  }
}
