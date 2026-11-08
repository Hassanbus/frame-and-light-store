import { createContext, useContext } from 'react'

// The "channel" that gives the cart to every component that needs it.
// WHY Context: the navbar badge, the product page and the cart page all need the
// same cart. Context avoids passing props through many layers ("prop drilling").
export const CartContext = createContext(null)

// Usage in a component: const { lines, addItem } = useCart()
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
