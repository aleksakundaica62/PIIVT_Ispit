import BaseService from "../../services/BaseService";
import TemperatureModel from "./temperature_model";
import CityService from "../city/city_service";
import * as mysql2 from "mysql2/promise";
import CityModel from "../city/city_model";
import IErrorResponse from "../../common/IErrorResponse.interface";

class TempModelOpitons {
  loadCity: boolean = false;
}
class TemperatureService extends BaseService<TemperatureModel> {
  private cityService: CityService;

  constructor(db: mysql2.Connection) {
    super(db);
    this.cityService = new CityService(this.db);
  }

  protected async adaptModel(
    data: any,
    options: Partial<TempModelOpitons>
  ): Promise<TemperatureModel> {
    const item: TemperatureModel = new TemperatureModel();

    item.temperatureId = +data?.temperature_id;
    item.cloudLevel = data?.cloud_level;
    item.overview = data?.overview;
    item.rainPercentige = +data?.rain_percentige;
    item.windSpeed = +data?.wind_speed;
    item.timestamp = new Date(data?.time);

    if (options.loadCity && item.cityId) {
      const result = await this.cityService.getById(item.cityId);

      if (result instanceof CityModel) {
        item.city = result;
      }
    }

    return item;
  }

  public async getById(
    tempId: number,
    options: Partial<TempModelOpitons> = {}
  ): Promise<TemperatureModel | null | IErrorResponse> {
    return await this.getIdFromTable("temperature", tempId, options);
  }
}
export default TemperatureService;
