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
}
