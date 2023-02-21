import { Router } from "express";
import studentController from "../controllers/student.controller";

export default Router()
  .post("/register", (req, res) => studentController.create(req, res))
//permitir ordenar los resultados de estudiantes
  //.get("/list", (req, res) => studentController.list(req, res))