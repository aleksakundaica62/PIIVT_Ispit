import Ajv from "ajv";

interface IAddCity {
  name: string;
  countryId: number;
}

const ajv = new Ajv();

const IAddCityValidator = ajv.compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
    countryId: {
      type: "integer",
      minimum: 1,
    },
  },
  required: ["name", "countryId"],
  additionalProperties: false,
});

export { IAddCity, IAddCityValidator };
