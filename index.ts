import Server from "./src/server";
import router from "./src/routes/router";
import express from "express";

import { configApp } from "./src/config";
export const app = express();
const PORT = parseInt(process.env.PORT || "8000");
const HOSTNAME = process.env.HOST || "localhost";
export default new Server(app)
  .globalConfig(configApp)
  .router(router)
  .listen(PORT, HOSTNAME);
