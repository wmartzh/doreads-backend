import express, { Application } from "express";

import * as http from "http";

const app = express();

export default class Server {
  //Load router
  router(routes: (app: Application) => void) {
    routes(app);
    return this;
  }
  //Listen server
  listen(port: number, hostname: string): Application {
    http.createServer(app).listen(port, hostname, () => {
      console.log(`⭐Server running and listen on http://${hostname}:${port} `);
    });
    return app;
  }
}
