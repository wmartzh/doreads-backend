import { Book, Role } from "@prisma/client";
import { HttpError } from "../types/custom.error";
import prisma from "../database/client";
import { getSearchQuery } from "../helpers/queries.helper";
import { paginateResult } from "../helpers/pagination.helper";
import { SortOptions } from "../types/req.filter";

class BookService {
  /**
   * It creates a new book
   * @param {Book} book - The book data
   * @returns A promise
   */
  async createBook(book: Book) {
    return await prisma.book.create({ data: book });
  }
  /**
   * It updates an existing book information
   * @param {Book} book - The book to update
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async updateBook(book: Book, bookId: number) {
    return await prisma.book.update({
      where: {
        id: bookId,
      },
      data: book,
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
      return await prisma.book.delete({
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
  async getAllBooks(limit: number, offset: number, sortOption: SortOptions, search?: string, req?: any) {
    const count = await prisma.book.count();
    if (count === 0) { throw new HttpError({ messsage: "There are no books" }, 404);}
    const query: any ={
      take: limit,
      skip: offset,
      orderBy: {
        [sortOption.order]: sortOption.sort,
      },
    };
    if (search) {
      query["where"] = getSearchQuery(["isbn", "title"], search);
    }
    const result = await prisma.book.findMany(query);
    const paginatedResult = paginateResult(result, limit, offset, count, req);
    return paginatedResult;
  }
  /**
   * It gets a book by id
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async getBookById(bookId: number) {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      throw new HttpError({ message: "Book not found" }, 404);
    }
    return book;
  }
}

export default new BookService();