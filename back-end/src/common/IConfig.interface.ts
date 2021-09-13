import { Algorithm } from "jsonwebtoken";

export default interface IConfig {
  server: {
    port: number;
    static: {
      path: string;
      route: string;
      cacheControl: boolean;
      dotifles: "allow" | "deny";
      etag: boolean;
      index: boolean;
      maxAge: number;
    };
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
    timezone: string;
  };
  auth: {
    admin: {
      auth: {
        private: string;
        public: string;
        duration: number;
      };
      refresh: {
        private: string;
        public: string;
        duration: number;
      };
      issuer: string;
      algorthm: Algorithm;
    };
  };
}
