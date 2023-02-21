import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/:studentId/change-status/:status", (req, res) => studentController.changeStudentStatus(req, res))
  .get('/name/:name', (req, res) => studentController.findStudentByName(req, res))
  .get(`/code/:code`, (req, res) => studentController.findStudentByCode(req, res));