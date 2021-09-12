import IModel from "../../common/IModel.interface";
import CityModel from "../city/city_model";
class CountryModel implements IModel {
  countryId: number;
  name: string;
  cities: CityModel[] = [];
}

export default CountryModel;
