import express, { Application, json } from "express";

import * as http from "http";
import cors from "cors";
import morgan from "morgan";

// Swagger Implementation
import swaggerDocs from "./docs/swagger";

const whitelist = process.env.ALLOWED_ORIGINS?.split(",");

const corsOptions: cors.CorsOptions = {
  origin: whitelist || false,
};

export const app = express();
//apply global middlewares
app.use(morgan("dev"));
app.use(json());
app.use(cors(corsOptions));

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
      swaggerDocs(app);
    });
    return app;
  }
}
