import CountryService from "../components/country/country_service";
import CityService from "../components/city/city_service";
import TemperatureService from "../components/temperature/temperature_service";
import AdminService from "../components/administrator/admin_service";
export default interface IServices {
  countryService: CountryService;
  cityService: CityService;
  tempService: TemperatureService;
  adminService: AdminService;
}
