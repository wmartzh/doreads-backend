import { Request, Response } from "express";
import { RegisterBookSchema, UpdateBookSchema } from "../models/book.models";
import bookService from "../services/book.service";
import { BaseController } from "../types/base.controller";
import { SortOptions } from "../services/book.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
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
        this.errorHandler(res, { error: "Book was already registered" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request body with the UpdateBookSchema, then calls the bookService.updateBook function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async updateBook(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const data = await UpdateBookSchema.validateAsync(req.body);
      const result = await bookService.updateBook(data, Number(id));
      this.responseHandler(res, { message: `Book ${result.title} updated successfully`}, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2025") {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It calls the bookService.deleteBook function, and sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async deleteBook(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const result = await bookService.deleteBook(Number(id), req.user.role);
      this.responseHandler(res, { message: `Book ${result.title} deleted successfully`}, 200);
    } catch (error: any) {
      if (error.code && error.code === "P2025") {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It calls the bookService.getBookByISBN function, and sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getBookByISBN(req: Request | any, res: Response) {
    try {
      const { isbn } = req.params;
      const result = await bookService.getBookByISBN(isbn);
      if (!result) {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.responseHandler(res, result, 200);
      }
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
  /**
   * It gets the query params, then calls the bookService.getBooks function, and sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async getBooks(req: Request | any, res: Response) {
    try {
      const size = parseInt(req.query.size as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const sort: SortOptions = {
        filter: req.query.filter as string || 'id',
        sortBy: (req.query.sort as string) === 'desc' ? 'desc' : 'asc',
      };
      const result = await bookService.getBooks(size, page, sort);
      this.responseHandler(res, result, 200);
    } catch (error: any) {
      if (error instanceof PrismaClientValidationError) {
        this.errorHandler(res, { error: "Invalid filter query params" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
}

export default new BookController();