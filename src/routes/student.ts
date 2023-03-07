import { Router } from "express";
import studentController from "../controllers/student.controller";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { filterMiddleware } from "../middlewares/filter.middleware";

export default Router()
  .post("/register", (req, res) => studentController.createStudent(req, res))
  .get("/:studentId/change-status/:status", (req, res) => studentController.changeStudentStatus(req, res))
  .put("/:id", (req, res) => studentController.updateStudent(req, res))
  .delete("/:id", (req, res) => studentController.deleteStudent(req, res))
  .get("/", paginationMiddleware, filterMiddleware, (req, res) => studentController.getAllStudents(req, res))
  .get("/:id", (req, res) => studentController.getStudentById(req, res));
