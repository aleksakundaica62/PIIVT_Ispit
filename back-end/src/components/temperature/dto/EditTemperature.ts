import Ajv from "ajv";

interface IEditTemperature {
  overview: "hours" | "days" | "weeks";
  rainPercentige: number;
  windSpeed: number;
  cloudLevel: "1" | "2" | "3" | "4";
  temperature: number;
}

const ajv = new Ajv();

const IEditTemperatureValidator = ajv.compile({
  type: "object",
  properties: {
    temperature: {
      type: "integer",
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
    "overview",
    "rainPercentige",
    "windSpeed",
    "cloudLevel",
  ],
  additionalProperties: false,
});

export { IEditTemperature, IEditTemperatureValidator };
