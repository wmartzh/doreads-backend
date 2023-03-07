import { NextFunction, Response } from "express";
import { RequestWithFilter } from "../types/req.filter";

/**
 * Middleware to add pagination information to the request object.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 */
export function filterMiddleware(
  req: RequestWithFilter,
  res: Response,
  next: NextFunction
) {
  const order = req.query.order as string || "id"; // Order by id
  const sort = req.query.sort as string === 'desc' ? 'desc' : 'asc'; // Sort by desc or asc

  // Add the filter information to the request object
  req.filter = { order, sort };

  next();
}