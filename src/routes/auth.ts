import { Router } from "express";
import authController from "../controllers/auth.controller";

export default Router()
  .post("/register", (req, res) => authController.register(req, res))
  .post("/login", (req, res) => authController.login(req, res));
