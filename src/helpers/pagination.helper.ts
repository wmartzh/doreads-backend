  /**
   * Format the result and return it
   * @returns A promise
   */
  export function paginateResult(result: any, limit: number, offset: number, count: number) {
    const size = result.length;
    const currentPage = Math.floor(offset / limit) + 1;
    const lastPage = Math.ceil(count / limit);
    const previousPage = currentPage > 1 ? currentPage - 1 : undefined;
    const nextPage = currentPage < lastPage ? currentPage + 1 : undefined;
  
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
