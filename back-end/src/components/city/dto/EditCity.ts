import Ajv from "ajv";

interface IEditCity {
  name: string;
}

const ajv = new Ajv();

const IEditCityValidator = ajv.compile({
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

export { IEditCity, IEditCityValidator };
