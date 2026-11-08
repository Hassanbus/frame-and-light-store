// All price rules of the store, in one place.
// WHY: the product page, cart, checkout and tests must all use the SAME rules.
import { SIZES } from '../data/sizes.js'

export const FREE_SHIPPING_OVER = 100 // dollars
export const SHIPPING_FEE = 8 // dollars

// Price of ONE print in one size. An unknown size falls back to the base (A4) price.
export function getUnitPrice(basePrice, sizeId) {
  const size = SIZES.find((option) => option.id === sizeId)
  return basePrice + (size ? size.extra : 0)
}

// Price of one cart line: unit price x quantity.
// A line looks like { product, size, quantity }.
export function getLineTotal(line) {
  return getUnitPrice(line.product.basePrice, line.size) * line.quantity
}

export function getSubtotal(lines) {
  return lines.reduce((sum, line) => sum + getLineTotal(line), 0)
}

// Free shipping when the subtotal is OVER $100 (so exactly $100 still pays $8).
// An empty cart has nothing to ship, so shipping is $0.
export function getShipping(subtotal) {
  if (subtotal <= 0) return 0
  return subtotal > FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE
}

export function getTotal(subtotal) {
  return subtotal + getShipping(subtotal)
}

// WHY Intl.NumberFormat: the browser adds the $ sign, commas and two decimals for us.
const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function formatPrice(amount) {
  return dollars.format(amount)
}
