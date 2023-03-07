import { Router } from "express";
import { filterMiddleware } from "../middlewares/filter.middleware";
import bookInfoController from "../controllers/bookInfo.controller";
import { paginationMiddleware } from "../middlewares/pagination.middleware";

export default Router()
  .post("/add", (req, res) => bookInfoController.addBook(req, res))
  .get("/:bookId/change-status/:status", (req, res) => bookInfoController.changeBookStatus(req, res))
  .put("/:id", (req, res) => bookInfoController.updateBook(req, res))
  .delete("/:id", (req, res) => bookInfoController.deleteBook(req, res))
  .get("/", paginationMiddleware, filterMiddleware, (req, res) => bookInfoController.getAllBooks(req, res))
  .get("/:id", (req, res) => bookInfoController.getBookById(req, res));