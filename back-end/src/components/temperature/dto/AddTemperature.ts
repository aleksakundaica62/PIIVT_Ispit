import Ajv from "ajv";

interface IAddTemperature {
  time: Date;
  overview: "hours" | "days" | "weeks";
  rainPercentige: number;
  windSpeed: number;
  cloudLevel: "1" | "2" | "3" | "4";
  cityId: number;
}

const ajv = new Ajv();

const IAddTemperatureValidator = ajv.compile({
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 64,
    },
    cityId: {
      type: "integer",
      minimum: 1,
    },
    overview: {
      enum: ["hours", "days", "weeks"],
    },
    rainPercentige: {
      type: "integer",
      minimum: 1,
    },
    windSpeed: {
      type: "integer",
      minimum: 1,
    },
    time: {
      type: "timestamp",
    },
    cloudLevel: {
      enum: ["1", "2", "3", "4"],
    },
  },
  required: [
    "name",
    "cityId",
    "overview",
    "rainPercentige",
    "windSpeed",
    "time",
    "cloudLevel",
  ],
  additionalProperties: false,
});

export { IAddTemperature, IAddTemperatureValidator };
