import { Request, Response } from "express";
import { RegisterBookSchema } from "../models/book.models";
import bookService from "../services/book.service";
import { BaseController } from "../types/base.controller";

class BookController extends BaseController {
  /**
   * It validates the request body with the RegisterBookSchema, then calls the bookService.createBook function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async createBook(req: Request | any, res: Response) {
    try {
      const data = await RegisterBookSchema.validateAsync(req.body);
      const result = await bookService.createBook(data);
      this.responseHandler(res, { message: `Book ${result.title} created successfully`}, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "Book was already register" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }
}

export default new BookController();