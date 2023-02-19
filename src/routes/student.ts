import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .post("/register", (req, res) => studentController.create(req, res))
  .post("/block", (req, res) => studentController.blockStudent(req, res))
  .post("/unblock", (req, res) => studentController.unblockStudent(req, res))