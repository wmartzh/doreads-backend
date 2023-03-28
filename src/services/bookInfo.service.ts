import { BookInfo, BookStatus, Role } from "@prisma/client";
import { HttpError } from "../types/custom.error";
import prisma from "../database/client";
import { SortOptions } from "../types/req.filter";
import { getSearchQuery } from "../helpers/queries.helper";
import { paginateResult } from "../helpers/pagination.helper";

class BookInfoService {
  /**
   * It adds a new book
   * @param {BookInfo} bookInfo - The book data
   * @returns A promise
   */
  async addBook(bookInfo: BookInfo) {
    return await prisma.bookInfo.create({ data: bookInfo });
  }
  /**
   * It changes the book status
   * @param {number} bookId - The book id
   * @param {string} status - The book status
   * @returns A promise
   */
  async changeBookStatus(bookId: number, status: BookStatus) {
    return await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: {
        status,
      },
    });
  }
  /**
   * It updates an existing book information
   * @param {BookInfo} bookInfo - The book to update
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async updateBook(bookInfo: BookInfo, bookId: number) {
    return await prisma.bookInfo.update({
      where: {
        id: bookId,
      },
      data: bookInfo,
    });
  }
  /**
   * It deletes a book, only if the user is an admin
   * @param {number} bookId - The book id
   * @param {Role} role - The user role
   * @returns A promise
   */
  async deleteBook(bookId: number, role: Role) {
    if (role === "ADMIN") {
      return await prisma.bookInfo.delete({
        where: {
          id: bookId,
        },
      });
    } else {
      throw new HttpError("You don't have permission to delete a book", 403);
    }
  }
  /**
   * It gets all books with the pagination and filter middlewares
   * @param {number} limit - The limit of books to return
   * @param {number} offset - The offset of books to return
   * @param {SortOptions} sortOption - The sort option
   * @param {string} search - The search query
   * @param {any} req - For the url in the pagination
   * @returns A promise
   */
  async getAllBooks(limit: number, offset: number, sortOption: SortOptions, search?: string) {
    const count = await prisma.bookInfo.count();
    if (count === 0) { throw new HttpError({ messsage: "Book not found" }, 404);}
    const query: any = {
      take: limit,
      skip: offset,
      orderBy: {
        [sortOption.order]: sortOption.sort,
      },
    };
    if (search) {
      query["where"] = getSearchQuery(["code"], search);
    }
    const result = await prisma.bookInfo.findMany(query);
    const paginatedResult = paginateResult(result, limit, offset, count);
    return paginatedResult;
  }
  /**
   * It gets a book by id
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async getBookById(bookId: number) {
    const book = await prisma.bookInfo.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) { throw new HttpError("Book not found", 404);}
    return book;
  }
}

export default new BookInfoService();