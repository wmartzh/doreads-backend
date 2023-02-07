import { Application } from "express";
import exampleRouter from "./example";
import authRouter from "./auth";

export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/", exampleRouter);
  app.use("/auth", authRouter);
}
