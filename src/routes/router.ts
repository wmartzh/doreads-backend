import { Application } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import authRouter from "./auth";
import studentRouter from "./student";

export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/auth", authRouter);
  app.use("/student", authMiddleware, studentRouter);
}
