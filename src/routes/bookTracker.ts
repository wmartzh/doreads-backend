import { Router } from "express";
import { filterMiddleware } from "../middlewares/filter.middleware";
import bookInfoController from "../controllers/bookTracker.controller";
import { paginationMiddleware } from "../middlewares/pagination.middleware";

export default Router()
  .post("/:bookId/add", (req, res) => bookInfoController.addBook(req, res))
  .get("/:bookId/change-status/:status", (req, res) => bookInfoController.changeBookStatus(req, res))
  .delete("/:bookId", (req, res) => bookInfoController.deleteLastBook(req, res))
  .get("/", paginationMiddleware, filterMiddleware, (req, res) => bookInfoController.getAllBooks(req, res))
  .get("/:id", (req, res) => bookInfoController.getBookById(req, res));