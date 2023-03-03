import { Request } from "express";

export interface RequestWithPagination extends Request {
  // Creation of the interface for the pagination
  pagination?: {
    limit: number; // Number of items to return
    offset: number; // Autocalculated offset for when we are querying the pagination
  };
}
