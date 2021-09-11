import Ajv from "ajv";

interface IAddCountry {
  name: string;
}

const ajv = new Ajv();

const IAddCountryValidator = ajv.compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
  },
  required: ["name"],
  additionalProperties: false,
});

export { IAddCountry, IAddCountryValidator };
