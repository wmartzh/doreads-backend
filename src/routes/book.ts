import { Router } from "express";
import bookController from "../controllers/book.controller";

export default Router()
  .post("/register", (req, res) => bookController.createBook(req, res));