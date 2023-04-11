import { BookTracker, BookStatus, Role } from "@prisma/client";
import { HttpError } from "../types/custom.error";
import prisma from "../database/client";
import { SortOptions } from "../types/req.filter";
import { getSearchQuery } from "../helpers/queries.helper";
import { paginateResult } from "../helpers/pagination.helper";

class BookTrackerService {
  private generateCode() {
    const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let code = "";
    // Generate the first 3 random letters
    for (let i = 0; i < 3; i++) {
      code += letters[Math.floor(Math.random() * letters.length)];
    }
    // Generate the next 6 random numbers
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  }
  /**
   * It adds a new book
   * @param 
   * @returns A promise
   */
  async createBook(books: BookTracker) {
    const data = { ...books, code: this.generateCode() };
    return await prisma.bookTracker.create({ data });
  }
  /**
   * It changes the book status
   * @param {number} bookId - The book id
   * @param {string} status - The book status
   * @returns A promise
   */
  async changeBookStatus(bookId: number, status: BookStatus) {
    return await prisma.bookTracker.update({
      where: {
        id: bookId,
      },
      data: {
        status,
      },
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
      return await prisma.bookTracker.delete({
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
    const count = await prisma.bookTracker.count();

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
    const result = await prisma.bookTracker.findMany(query);
    const paginatedResult = paginateResult(result, limit, offset, count);
    return paginatedResult;
  }
  /**
   * It gets a book by id
   * @param {number} bookId - The book id
   * @returns A promise
   */
  async getBookById(bookId: number) {
    const book = await prisma.bookTracker.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) { throw new HttpError("Book not found", 404);}
    return book;
  }
}

export default new BookTrackerService();