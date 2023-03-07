import { Request } from "express";

export interface SortOptions {
  order: string;
  sort: "asc" | "desc";
}

export interface RequestWithFilter extends Request {
 // Creation of the interface for the fultering
  filter?: SortOptions;

}