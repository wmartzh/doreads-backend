import { Book } from "@prisma/client";
import prisma from "../database/client";

class BookService {
  /**
   * It creates a new book
   * @param {Book} book - The book data
   * @returns A promise
   */
  async createBook(book: Book) {
    return prisma.book.create({ data: book });
  }
}

export default new BookService();