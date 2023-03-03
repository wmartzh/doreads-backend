  /**
   * This function will format every result of any partitions using the pagination
   * @param {any} result
   */
  export function formatResult(result: any) {
    return {
      data: result.data,
      nextPage: result.nextPage,
      lastPage: result.lastPage,
      currentPage: result.currentPage,
      size: result.size,
    };
  }
  /**
   * Format the result and return it
   * @returns A promise
   */
  export function paginateResult(result: any, limit: number, offset: number, count: number) {
    const size = result.length;
    const currentPage = Math.floor(offset / limit) + 1;
    const lastPage = Math.ceil(count / limit);
  
    const nextPage = currentPage < lastPage ? currentPage + 1 : undefined;
  
    return {
      data: result,
      nextPage,
      lastPage,
      currentPage,
      size,
    };
  }
