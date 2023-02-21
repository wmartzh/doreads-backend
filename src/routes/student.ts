import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .get("/", (req, res) => studentController.getAllStudents(req, res))
  .get("/:id", (req, res) => studentController.getStudentById(req, res))
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/:studentId/change-status/:status", (req, res) => studentController.changeStudentStatus(req, res));