// The cart reducer: the ONLY place where the cart can change.
// WHY a reducer: every rule for changing the cart lives in one pure function.
// Pure means: same input -> same output, no side effects. So it is easy to test.
import { SIZES } from '../data/sizes.js'
import { getProductById } from '../utils/catalog.js'

export const MAX_QUANTITY = 10

// One print in one size is one cart line: "dune-line" + "A3" -> "dune-line|A3".
export function makeLineKey(productId, size) {
  return `${productId}|${size}`
}

// Keep a quantity between 1 and MAX_QUANTITY. Bad input (like "abc") becomes 1.
export function clampQuantity(value) {
  const number = Math.floor(Number(value))
  if (!Number.isFinite(number) || number < 1) return 1
  return Math.min(number, MAX_QUANTITY)
}

// items is an array like [{ key, productId, size, quantity }].
// We never change the old array: we always return a NEW one (React needs this to notice changes).
export function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const key = makeLineKey(action.productId, action.size)
      const existing = items.find((item) => item.key === key)
      if (existing) {
        // Same print in the same size: only raise the quantity.
        return items.map((item) =>
          item.key === key
            ? { ...item, quantity: clampQuantity(item.quantity + clampQuantity(action.quantity)) }
            : item,
        )
      }
      const newItem = {
        key,
        productId: action.productId,
        size: action.size,
        quantity: clampQuantity(action.quantity),
      }
      return [...items, newItem]
    }
    case 'setQuantity':
      return items.map((item) =>
        item.key === action.key ? { ...item, quantity: clampQuantity(action.quantity) } : item,
      )
    case 'remove':
      return items.filter((item) => item.key !== action.key)
    case 'clear':
      return []
    default:
      // WHY throw: a typo in an action name should fail loudly, not silently.
      throw new Error(`Unknown cart action: ${action.type}`)
  }
}

// The saved cart from localStorage can be old or broken. We keep only lines
// with a real product and a real size, and we add them again with the reducer,
// so the same rules apply (duplicates are merged, quantity stays 1 to 10).
export function restoreCart(saved) {
  if (!Array.isArray(saved)) return []
  return saved
    .filter((item) => item && getProductById(item.productId) && SIZES.some((s) => s.id === item.size))
    .reduce(
      (cart, item) =>
        cartReducer(cart, {
          type: 'add',
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        }),
      [],
    )
}
