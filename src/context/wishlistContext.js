import { createContext, useContext } from 'react'

// The "channel" that gives the wishlist to every component that needs it.
export const WishlistContext = createContext(null)

// Usage in a component: const { isInWishlist, toggleWishlist } = useWishlist()
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return context
}
