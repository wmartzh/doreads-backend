import { Application } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import authRouter from "./auth";
import studentRouter from "./student";
import { paginationMiddleware } from '../middlewares/page.middleware';

export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.get("/health", (_req, res) => res.sendStatus(200));
  app.use("/auth", authRouter);
  app.use("/student", authMiddleware,paginationMiddleware, studentRouter); 
}
