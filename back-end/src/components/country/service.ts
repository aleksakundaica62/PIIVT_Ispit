import CountryModel from "./model";

class CountryService {
  public async getAll(): Promise<CountryModel[]> {
    const lista: CountryModel[] = [];

    lista.push({
      country_id: 1,
      name: "Serbia",
    });
    lista.push({
      country_id: 2,
      name: "Croatia",
    });
    lista.push({
      country_id: 3,
      name: "Slovenia",
    });

    return lista;
  }
  public async getById(countryId: number): Promise<CountryModel> | null {
    if (countryId === 1 || countryId === 2 || countryId === 3) {
      if (countryId === 1) {
        return {
          country_id: 1,
          name: "Serbia",
        };
      }
      if (countryId === 2) {
        return {
          country_id: 2,
          name: "Croatia",
        };
      }
      if (countryId === 3) {
        return {
          country_id: 3,
          name: "Slovenia",
        };
      }
    } else {
      return null;
    }
  }
}

export default CountryService;
