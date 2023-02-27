import { Book, Role } from "@prisma/client";
import { HttpError } from "../types/custom.error";
import prisma from "../database/client";

export interface SortOptions {
  filter: string;
  sortBy: "asc" | "desc";
}
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
   * It gets a book by ISBN
   * @param {string} isbn - The book ISBN
   * @returns A promise
   */
  async getBookByISBN(isbn: string) {
    return await prisma.book.findUnique({ where: { isbn }, });
  }
  /**
   * It gets all books
   * @param {number} size - The number of books to return
   * @param {number} page - The page number
   */
  async getBooks(size: number, page: number, sort: SortOptions ) {
    return await prisma.book.findMany({
      take: size,
      skip: (page -1) * size,
      orderBy: {
        [sort.filter]: sort.sortBy,
      },
    });
  } 
}

export default new BookService();