import Ajv from "ajv";

interface IAddTemperature {
  temperature: number;
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
    temperature: {
      type: "integer",
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
    cloudLevel: {
      enum: ["1", "2", "3", "4"],
    },
  },
  required: [
    "temperature",
    "cityId",
    "overview",
    "rainPercentige",
    "windSpeed",
    "cloudLevel",
  ],
  additionalProperties: false,
});

export { IAddTemperature, IAddTemperatureValidator };
