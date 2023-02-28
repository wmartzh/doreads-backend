import { Router } from "express";
import bookController from "../controllers/book.controller";

export default Router()
  .post("/register", (req, res) => bookController.createBook(req, res))
  .put("/:id", (req, res) => bookController.updateBook(req, res))
  .delete("/:id", (req, res) => bookController.deleteBook(req, res))
  .get("/:isbn", (req, res) => bookController.getBookByISBN(req, res))
  .get("/", (req, res) => bookController.getBooks(req, res));