// The three print sizes. "extra" is added to the product's base price (the A4 price).
// WHY whole dollars: adding whole numbers never creates rounding problems like 0.1 + 0.2.
export const SIZES = [
  { id: 'A4', dimensions: '21 × 29.7 cm', extra: 0 },
  { id: 'A3', dimensions: '29.7 × 42 cm', extra: 15 },
  { id: 'A2', dimensions: '42 × 59.4 cm', extra: 35 },
]

export const DEFAULT_SIZE = 'A4'
