import Ajv from "ajv";

interface IEditCountry {
  name: string;
}

const ajv = new Ajv();

const IEditCountryValidator = ajv.compile({
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

export { IEditCountry, IEditCountryValidator };
