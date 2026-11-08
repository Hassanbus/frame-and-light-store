import { useEffect, useMemo, useReducer } from 'react'
import { getProductById } from '../utils/catalog.js'
import { getSubtotal } from '../utils/price.js'
import { loadState, saveState } from '../utils/storage.js'
import { CartContext } from './cartContext.js'
import { cartReducer, restoreCart } from './cartReducer.js'

const CART_KEY = 'fl-cart'

// WHY a function: useReducer calls it only once, on the very first render,
// so we do not read localStorage again on every render.
function loadCart() {
  return restoreCart(loadState(CART_KEY, []))
}

export default function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart)

  // Save the cart every time it changes, so it is still there after a refresh.
  useEffect(() => {
    saveState(CART_KEY, items)
  }, [items])

  const value = useMemo(() => {
    // Join every saved line with its product, so pages get the title, image and price.
    // WHY: we store only ids in the cart. Prices always come from products.js,
    // so an old price saved in localStorage can never be shown.
    const lines = items.map((item) => ({ ...item, product: getProductById(item.productId) }))

    return {
      lines,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: getSubtotal(lines),
      addItem: (productId, size, quantity) => dispatch({ type: 'add', productId, size, quantity }),
      setQuantity: (key, quantity) => dispatch({ type: 'setQuantity', key, quantity }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      clearCart: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext value={value}>{children}</CartContext>
}
