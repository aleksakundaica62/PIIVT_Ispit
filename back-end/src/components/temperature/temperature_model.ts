import IModel from "../../common/IModel.interface";
import CityModel from "../city/city_model";
class TemperatureModel implements IModel {
  temperatureId: number;
  timestamp: Date;
  overview: string;
  rainPercentige: number;
  windSpeed: number;
  cloudLevel: string;
  cityId: number;
  city: CityModel;
  temperature: number;
}

export default TemperatureModel;
