import { Application } from "express";
import exampleRouter from "./example";
export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/", exampleRouter);
}
