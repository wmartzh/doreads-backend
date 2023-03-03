export function getSearchQuery(
  fields: string[],
  search: string,
  mode = "insensitive"
) {
  return {
    OR: fields.map((field) => {
      return {
        [field]: {
          contains: search,
          mode,
        },
      };
    }),
  };
}
