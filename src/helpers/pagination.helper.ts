import { Request } from "express";
  /**
   * Format the result and return it
   * @returns A promise
   */
  export function paginateResult(result: any, limit: number, offset: number, count: number, req: Request) {
    const size = result.length;
    const currentPage = Math.floor(offset / limit) + 1;
    const lastPage = Math.ceil(count / limit);

    let previousPage = null;
    if (currentPage > 1) {
      const url = new URL(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
      url.searchParams.set("limit", limit.toString());
      url.searchParams.set("page", (currentPage - 1).toString());
      previousPage = url.toString();
    }
    let nextPage = null;
    if (currentPage < lastPage) {
      const url = new URL(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
      url.searchParams.set("limit", limit.toString());
      url.searchParams.set("page", (currentPage + 1).toString());
      nextPage = url.toString();
    }
  
    return {
      info: {
        count,
        pages: lastPage,
        pageSize: size,
        currentPage,
        prev: previousPage,
        next: nextPage,
      },
      data: result,
    };
  }
