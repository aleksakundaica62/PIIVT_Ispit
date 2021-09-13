import IConfig from "../common/IConfig.interface";
import { readFileSync } from "fs";

const Config: IConfig = {
  server: {
    port: 40080,
    static: {
      route: "/static",
      path: "./static",
      cacheControl: false,
      dotifles: "deny",
      etag: false,
      index: false,
      maxAge: 360000,
    },
  },
  database: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "weather_app",
    charset: "utf8",
    timezone: "+01:00",
  },
  auth: {
    admin: {
      algorthm: "RS256",
      issuer: "localhost",
      auth: {
        duration: 60 * 60 * 24 * 7,
        public: readFileSync("keystore/admin-auth.public", "utf-8"),
        private: readFileSync("keystore/admin-auth.private", "utf-8"),
      },
      refresh: {
        duration: 60 * 60 * 24 * 31,
        public: readFileSync("keystore/admin-auth.public", "utf-8"),
        private: readFileSync("keystore/admin-auth.private", "utf-8"),
      },
    },
  },
};

export default Config;
