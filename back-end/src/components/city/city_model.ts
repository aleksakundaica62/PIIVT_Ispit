import IModel from "../../common/IModel.interface";
import CountryModel from "../country/country_model";
class CityModel implements IModel {
  city_id: number;
  name: string;
  countryId: number;
  country: CountryModel;
}

export default CityModel;
