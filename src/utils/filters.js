// Shop filters: read them from the URL and apply them to the products.
// WHY the URL: the filters live in the query string (?q=fog&category=Minimal),
// so a filtered page can be shared as a link, and refresh keeps the filters.
import { CATEGORIES } from '../data/products.js'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
]

export const DEFAULT_SORT = 'newest'

// A price from the URL: a number of 0 or more, or null when it is empty or wrong.
function readPrice(text) {
  if (!text) return null
  const number = Number(text)
  return Number.isFinite(number) && number >= 0 ? number : null
}

// WHY we check everything: anyone can type any URL by hand,
// so unknown values simply fall back to safe defaults.
export function readFilters(searchParams) {
  const categoryText = (searchParams.get('category') ?? '').toLowerCase()
  const sortText = searchParams.get('sort')

  return {
    q: searchParams.get('q') ?? '',
    category: CATEGORIES.find((name) => name.toLowerCase() === categoryText) ?? '',
    min: readPrice(searchParams.get('min')),
    max: readPrice(searchParams.get('max')),
    sort: SORT_OPTIONS.some((option) => option.value === sortText) ? sortText : DEFAULT_SORT,
  }
}

const COMPARE = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  'price-asc': (a, b) => a.basePrice - b.basePrice,
  'price-desc': (a, b) => b.basePrice - a.basePrice,
  name: (a, b) => a.title.localeCompare(b.title),
}

export function filterProducts(products, filters) {
  const query = filters.q.trim().toLowerCase()

  const results = products.filter((product) => {
    const text = `${product.title} ${product.category} ${product.description}`.toLowerCase()
    if (query && !text.includes(query)) return false
    if (filters.category && product.category !== filters.category) return false
    if (filters.min !== null && product.basePrice < filters.min) return false
    if (filters.max !== null && product.basePrice > filters.max) return false
    return true
  })

  // filter() already made a NEW array, so sort() does not change the original list.
  return results.sort(COMPARE[filters.sort] ?? COMPARE[DEFAULT_SORT])
}
