import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import authController from "../controllers/auth.controller";

export default Router()

  .post("/register", (req, res) => authController.register(req, res))
  .post("/login", (req, res) => authController.login(req, res))
  .post("/refreshToken", (req, res) => authController.resfreshToken(req, res))
  .get("/profile", authMiddleware, (req, res) => authController.profile(req, res));