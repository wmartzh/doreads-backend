import { Request, Response } from 'express';
import { AddBookSchema, ChangeBookStatusSchema, UpdateBookSchema } from '../models/bookInfo.models';
import bookInfoService from '../services/bookInfo.service';
import { BaseController } from '../types/base.controller';

class BookInfoController extends BaseController {
  /**
   * It validates the request body with the AddBookSchema, then calls the bookInfoService.addBook function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async addBook(req: Request | any, res: Response) {
    try {
      const data = await AddBookSchema.validateAsync(req.body);
      const result = await bookInfoService.addBook(data);
      this.responseHandler(res, { message: `Book ${result.code} added successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2002') {
        this.errorHandler(res, { error: 'Book was already registered' });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request params with the ChangeBookStatusSchema, then calls the bookInfoService.changeBookStatus function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async changeBookStatus(req: Request | any, res: Response) {
    try {
      const data = await ChangeBookStatusSchema.validateAsync(req.params);
      const result = await bookInfoService.changeBookStatus(data.bookId, data.status);
      this.responseHandler(res, { message: `Book ${result.code} status changed successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It validates the request body with the UpdateBookSchema, then calls the bookInfoService.updateBook function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async updateBook(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const data = await UpdateBookSchema.validateAsync(req.body);
      const result = await bookInfoService.updateBook(data, Number(id));
      this.responseHandler(res, { message: `Book ${result.code} updated successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  /**
   * It calls the bookInfoService.deleteBook function, and finally sends the response
   * @param {Request | any} req
   * @param {Response} res
   */
  async deleteBook(req: Request | any, res: Response) {
    try {
      const { id } = req.params;
      const result = await bookInfoService.deleteBook(Number(id), req.user.role);
      this.responseHandler(res, { message: `Book ${result.code} deleted successfully` }, 200);
    } catch (error: any) {
      if (error.code && error.code === 'P2025') {
        this.errorHandler(res, { error: "Book doesn't exist" });
      } else {
        this.errorHandler(res, error);
      }
    }
  }
}

export default new BookInfoController();