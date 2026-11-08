import { useEffect, useMemo, useReducer } from 'react'
import { loadState, saveState } from '../utils/storage.js'
import { WishlistContext } from './wishlistContext.js'
import { restoreWishlist, wishlistReducer } from './wishlistReducer.js'

const WISHLIST_KEY = 'fl-wishlist'

function loadWishlist() {
  return restoreWishlist(loadState(WISHLIST_KEY, []))
}

// Same pattern as CartProvider: reducer + Context + localStorage.
export default function WishlistProvider({ children }) {
  const [ids, dispatch] = useReducer(wishlistReducer, null, loadWishlist)

  useEffect(() => {
    saveState(WISHLIST_KEY, ids)
  }, [ids])

  const value = useMemo(
    () => ({
      ids,
      isInWishlist: (productId) => ids.includes(productId),
      toggleWishlist: (productId) => dispatch({ type: 'toggle', productId }),
      removeFromWishlist: (productId) => dispatch({ type: 'remove', productId }),
    }),
    [ids],
  )

  return <WishlistContext value={value}>{children}</WishlistContext>
}
