import IModel from "../../common/IModel.interface";
import CityModel from "../city/city_model";
class TemperatureModel implements IModel {
  temperatureId: number;
  cityId: number;
  city: CityModel;
  overview: string;
  rainPercentige: number;
  windSpeed: number;
  cloudLevel: string;
  timestamp: Date;
}

export default TemperatureModel;
