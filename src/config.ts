import { Application, json } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerDocs from "./docs/swagger";
const whitelist = process.env.ALLOWED_ORIGINS?.split(",");

const corsOptions: cors.CorsOptions = {
  origin: whitelist || false,
};

console.log("◉ ▶ file: config.ts:11 ▶ whitelist:", whitelist);
export function configApp(app: Application) {
  app.use(cors(corsOptions));
  app.use(json());
  app.use(morgan("tiny"));
  swaggerDocs(app);
}
