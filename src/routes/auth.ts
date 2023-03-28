import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

export default Router()
  .post("/register", (req, res) => authController.register(req, res))
  .post("/login", (req, res) => authController.login(req, res))
  .get("/logout", authMiddleware, (req, res) => authController.logout(req, res))
  .get("/verify", authMiddleware, (_req, res) => res.sendStatus(200))
  .post("/refresh-token", authMiddleware, (req, res) =>
    authController.resfreshToken(req, res)
  )
  .get("/profile", authMiddleware, (req, res) =>
    authController.profile(req, res)
  );
