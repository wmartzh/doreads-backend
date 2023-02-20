import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .post("/register", (req, res) => studentController.create(req, res))
  .post("/change-status", (req, res) => studentController.changeStudentStatus(req, res))
