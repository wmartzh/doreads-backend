import { Router } from "express";
import { filterMiddleware } from "../middlewares/filter.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import bookController from "../controllers/book.controller";
import multer from "multer";

const upload = multer();

export default Router()
  .post("/register", upload.single("image"), (req, res) => bookController.createBook(req, res))
  .put("/:id", (req, res) => bookController.updateBook(req, res))
  .delete("/:id", (req, res) => bookController.deleteBook(req, res))
  .get("/", paginationMiddleware, filterMiddleware, (req, res) => bookController.getAllBooks(req, res))
  .get("/:id", (req, res) => bookController.getBookById(req, res));