import { Application } from "express";
import * as http from "http";

export default class Server {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  /**
   * This function takes a function as an argument, and then calls that function, passing in the app
   * object.
   * @param configFunction - This is a function that takes an Application as a parameter.
   * @returns The instance of the class.
   */
  globalConfig(configFunction: (app: Application) => void) {
    configFunction(this.app);
    return this;
  }
  router(routes: (app: Application) => void) {
    routes(this.app);
    return this;
  }
  //Listen server
  listen(port: number, hostname: string): Application {
    http.createServer(this.app).listen(port, hostname, () => {
      console.log(`⭐Server running and listen on http://${hostname}:${port} `);
    });
    return this.app;
  }
}
