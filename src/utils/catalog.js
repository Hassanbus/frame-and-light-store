// Small helpers to find products in the catalog.
import { products } from '../data/products.js'

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

// Related prints: first the same category, then other prints to fill the row.
// WHY the "all" parameter: tests can pass a small fake list instead of the real data.
export function getRelatedProducts(product, all = products, limit = 4) {
  const others = all.filter((item) => item.id !== product.id)
  const sameCategory = others.filter((item) => item.category === product.category)
  const otherCategories = others.filter((item) => item.category !== product.category)
  return [...sameCategory, ...otherCategories].slice(0, limit)
}

// Every photo exists in two widths in public/images/: 600px and 1200px.
export function getImageSrc(product, width) {
  return `/images/${product.imageSeed}-${width}.jpg`
}

// The first sentence of every description says what is IN the photo,
// so it is a good alt text for screen reader users.
export function getAltText(product) {
  return product.description.split('. ')[0]
}
