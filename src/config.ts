import { Application, json, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerDocs from "./docs/swagger";
const whitelist = process.env.ALLOWED_ORIGINS?.split(",");

const corsOptions: cors.CorsOptions = {
  origin: whitelist || false,
};
export function configApp(app: Application) {
  app.use(cors(corsOptions));
  app.use(json());
  app.use(morgan("tiny"));
  swaggerDocs(app);
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    if (whitelist?.includes(req.headers.origin || "")) {
      res.set("Access-Control-Allow-Origin", req.headers.origin);

      res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }

    next();
  });
}
