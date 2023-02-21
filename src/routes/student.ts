import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/", (req, res) => studentController.getAllStudents(req, res))
  .get("/:id", (req, res) => studentController.getStudentById(req, res))
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/:studentId/change-status/:status", (req, res) => studentController.changeStudentStatus(req, res))
  .get("/filter/A-Z", (req, res) => studentController.getStudentsFilterAtoZ(req, res))
  .get("/filter/Z-A", (req, res) => studentController.getStudentsFilterZtoA(req, res))
  .get("/filter/CodeAsc", (req, res) => studentController.getStudentsFilterCodeAsc(req, res))
  .get("/filter/CodeDesc", (req, res) => studentController.getStudentsFilterCodeDesc(req, res))
  .get("/filter/IdAsc", (req, res) => studentController.getStudentsFilterIdAsc(req, res))
  .get("/filter/IdDesc", (req, res) => studentController.getStudentsFilterIdDesc(req, res))



