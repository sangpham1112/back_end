export interface Filters {
    category?: { $in: Array<string> },
    price?: { $gte: number, $lte: number },
    rating?: { $gte: number }
  }