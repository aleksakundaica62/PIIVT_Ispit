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
}

export default CountryService;
