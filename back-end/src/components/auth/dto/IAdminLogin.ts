import Ajv from "ajv";

interface IAdminLogin {
  username: string;
  password: string;
}

const ajv = new Ajv();

const IAdminLoginValidator = ajv.compile({
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 5,
      maxLength: 64,
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 255,
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
});

export { IAdminLogin, IAdminLoginValidator };
