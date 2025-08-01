export function buildPrismaWhere(query: any) {
  let where: any = {};

  // 1. Basic filters (exact match)
  if (query.filters) {
    let filters = {};
    try {
      filters = typeof query.filters === 'string' ? JSON.parse(query.filters) : query.filters;
    } catch {
      filters = {};
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        where[key] = { in: value };
      } else {
        where[key] = value;
      }
    });
  }

  // 2. Search filters (partial match, LIKE)
  if (query.searchFilters) {
    let searchFilters = {};
    try {
      searchFilters = typeof query.searchFilters === 'string' ? JSON.parse(query.searchFilters) : query.searchFilters;
    } catch {
      searchFilters = {};
    }
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) {
        where[key] = { contains: value, mode: "insensitive" };
      }
    });
  }

  // 3. Ranged filters
  if (query.rangedFilters) {
    let rangedFilters = [];
    try {
      rangedFilters = typeof query.rangedFilters === 'string' ? JSON.parse(query.rangedFilters) : query.rangedFilters;
    } catch {
      rangedFilters = [];
    }
    rangedFilters.forEach((range: any) => {
      if (range.key && (range.start !== undefined || range.end !== undefined)) {
        where[range.key] = {};
        if (range.start !== undefined) where[range.key].gte = range.start;
        if (range.end !== undefined) where[range.key].lte = range.end;
      }
    });
  }

  return where;
}
