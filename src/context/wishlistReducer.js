// The wishlist is just a list of product ids, for example ['dune-line', 'snow-peak'].
import { getProductById } from '../utils/catalog.js'

export function wishlistReducer(ids, action) {
  switch (action.type) {
    case 'toggle':
      // Already saved? Remove it. Not saved yet? Add it.
      return ids.includes(action.productId)
        ? ids.filter((id) => id !== action.productId)
        : [...ids, action.productId]
    case 'remove':
      return ids.filter((id) => id !== action.productId)
    default:
      throw new Error(`Unknown wishlist action: ${action.type}`)
  }
}

// Saved data can be broken: keep only ids of real products, without duplicates.
export function restoreWishlist(saved) {
  if (!Array.isArray(saved)) return []
  return [...new Set(saved)].filter((id) => getProductById(id))
}
