import { Router } from "express";
import authController from "../controllers/auth.controller";

export default Router()
/**
 * Aca deberia ir como se documenta el endpoint de /register
 */
  .post("/register", (req, res) => authController.register(req, res))
  .post("/login", (req, res) => authController.login(req, res));
