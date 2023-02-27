import { NextFunction, Response } from "express";
import { RequestWithPagination } from "../types/req.pagination";

/**
 * Middleware to add pagination information to the request object.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export function paginationMiddleware(req: RequestWithPagination, res: Response, next: NextFunction) {
  const limit = parseInt(req.query.limit as string) || 10; // Number of items to return
  const page = parseInt(req.query.page as string) || 1; // Page number
  const offset = (page - 1) * limit; // Calculate the offset based on the page and limit values
  

  // Add the pagination information to the request object
  req.pagination = { limit, page, offset };

  next();
}
