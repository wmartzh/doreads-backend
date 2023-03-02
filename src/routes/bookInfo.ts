import { Router } from "express";
import bookInfoController from "../controllers/bookInfo.controller";

export default Router()
  .post("/add", (req, res) => bookInfoController.addBook(req, res))
  .get("/:bookId/change-status/:status", (req, res) => bookInfoController.changeBookStatus(req, res))
  .put("/:id", (req, res) => bookInfoController.updateBook(req, res))
  .delete("/:id", (req, res) => bookInfoController.deleteBook(req, res))
  .get("/", (req, res) => bookInfoController.getAllBooks(req, res));