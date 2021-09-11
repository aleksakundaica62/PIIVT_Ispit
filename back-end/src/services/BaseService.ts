import IModel from "../common/IModel.interface";
import * as mysql2 from "mysql2/promise";
import IErrorResponse from "../common/IErrorResponse.interface";
import { resolve } from "path/posix";
export default abstract class BaseService<T extends IModel> {
  constructor(private dbConnection: mysql2.Connection) {}

  protected get db(): mysql2.Connection {
    return this.dbConnection;
  }

  protected abstract adaptModel(data: any): Promise<T>;

  protected async getAllFromTable(
    tableName: string
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

  protected async getIdFromTable(
    tableName: string,
    id: number
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
          resolve(await this.adaptModel(rows[0]));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }
  protected async getAllByFieldNameFromTable(
    tableName: string,
    fieldName: string,
    fieldValue: any
  ): Promise<T[] | IErrorResponse> {
    return new Promise<T[] | IErrorResponse>(async (resolve) => {
      const sql: string = `SELECT * FROM ${tableName} WHERE ${fieldName} = ?;`;
      this.db
        .execute(sql, [fieldValue])
        .then(async (result) => {
          const rows = result[0];
          const lista: T[] = [];

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
}
