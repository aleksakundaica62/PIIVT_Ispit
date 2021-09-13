import BaseService from "../../services/BaseService";
import TemperatureModel from "./temperature_model";
import CityModel from "../city/city_model";
import IErrorResponse from "../../common/IErrorResponse.interface";
import { IAddTemperature } from "./dto/AddTemperature";
import { IEditTemperature } from "./dto/EditTemperature";

class TempModelOpitons {
  loadCity: boolean = false;
}
class TemperatureService extends BaseService<TemperatureModel> {
  protected async adaptModel(
    data: any,
    options: Partial<TempModelOpitons>
  ): Promise<TemperatureModel> {
    const item: TemperatureModel = new TemperatureModel();

    item.temperatureId = Number(data?.tempetature_id);
    item.temperature = Number(data?.temperature);
    item.overview = data?.overview;
    item.rainPercentige = Number(data?.rain_percentige);
    item.windSpeed = Number(data?.wind_speed);
    item.cloudLevel = data?.cloud_level;
    item.timestamp = new Date(data?.time);
    item.cityId = +data?.city_id;

    const result = await this.services.cityService.getById(item.cityId);

    if (result instanceof CityModel) {
      item.city = result;
    }

    return item;
  }

  public async getById(
    tempId: number,
    options: Partial<TempModelOpitons> = {}
  ): Promise<TemperatureModel | null | IErrorResponse> {
    return await this.getIdFromTable("tempetature", tempId, options);
  }

  public async getAllByCountryId(
    cityId: number,
    options: Partial<TempModelOpitons | IErrorResponse> = {}
  ): Promise<TemperatureModel[] | IErrorResponse> {
    return await this.getAllByFieldNameFromTable(
      "temperature",
      "city_id",
      cityId,
      options
    );
  }

  public async add(
    data: IAddTemperature
  ): Promise<TemperatureModel | IErrorResponse> {
    return new Promise<TemperatureModel | IErrorResponse>(async (resolve) => {
      const sql =
        "INSERT tempetature SET overview = ?, rain_percentige = ?, wind_speed = ?, cloud_level = ?, city_id = ?, temperature = ? ";
      this.db
        .execute(sql, [
          data.overview,
          data.rainPercentige,
          data.windSpeed,
          data.cloudLevel,
          data.cityId,
          data.temperature,
        ])
        .then(async (result) => {
          const info: any = result[0];

          const newTemp: number = +info?.insertId;

          resolve(await this.getById(newTemp));
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
    tempId: number,
    data: IEditTemperature
  ): Promise<TemperatureModel | IErrorResponse | null> {
    const result = await this.getById(tempId);

    if (result === null) {
      return null;
    }
    if (!(result instanceof TemperatureModel)) {
      return result;
    }
    return new Promise<TemperatureModel | IErrorResponse>(async (resolve) => {
      const sql =
        "UPDATE tempetature SET overview = ?, rain_percentige = ?, wind_speed = ?, cloud_level = ?, temperature = ?";
      this.db
        .execute(sql, [
          data.overview,
          data.rainPercentige,
          data.windSpeed,
          data.cloudLevel,
          data.temperature,
        ])
        .then(async (result) => {
          resolve(await this.getById(tempId));
        })
        .catch((error) => {
          resolve({
            errorCode: error?.errno,
            errorMessage: error?.sqlMessage,
          });
        });
    });
  }

  public async delete(tempId: number): Promise<IErrorResponse> {
    return new Promise<IErrorResponse>((resolve) => {
      const sql = "DELETE FROM tempetature WHERE tempetature_id = ?;";
      this.db
        .execute(sql, [tempId])
        .then(async (result) => {
          const deleteInfo: any = result[0];
          const deletedRows: number = +deleteInfo?.affectedRows;
          console.log(result);

          if (deletedRows === 1) {
            resolve({
              errorCode: 0,
              errorMessage: "Temperature deleted",
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
export default TemperatureService;
