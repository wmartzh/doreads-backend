import { Router } from "express";
import studentController from "../controllers/student.controller";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { filterMiddleware } from "../middlewares/filter.middleware";

export default Router()
  .get("/", paginationMiddleware, filterMiddleware, (req, res) =>
    studentController.getStudents(req, res)
  )
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/:id", (req, res) => studentController.getStudentById(req, res))
  .post("/register", (req, res) => studentController.create(req, res))
  .get("/:studentId/change-status/:status", (req, res) =>
    studentController.changeStudentStatus(req, res)
  )
  .delete("/:id/delete", (req, res) =>
    studentController.deleteStudentById(req, res)
  )
  .post("/:id/update", (req, res) => studentController.updateStudent(req, res));
