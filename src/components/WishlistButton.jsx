import { useToast } from '../context/toastContext.js'
import { useWishlist } from '../context/wishlistContext.js'
import Icon from './Icon.jsx'
import './WishlistButton.css'

// The heart button. Two looks: a round icon (on cards) or a button with text (product page).
// WHY the label changes: it always says what will happen when you click it.
export default function WishlistButton({ product, withText = false, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const saved = isInWishlist(product.id)
  const label = saved ? 'Remove from wishlist' : 'Add to wishlist'

  function handleClick() {
    toggleWishlist(product.id)
    showToast(saved ? `Removed "${product.title}" from your wishlist` : `Saved "${product.title}" to your wishlist`)
  }

  if (withText) {
    return (
      <button type="button" className={`button button-secondary wishlist-text ${className}`} onClick={handleClick}>
        <Icon name="heart" filled={saved} size={20} />
        {label}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`icon-button wishlist-icon ${saved ? 'is-saved' : ''} ${className}`}
      onClick={handleClick}
      aria-label={`${label}: ${product.title}`}
      title={label}
    >
      <Icon name="heart" filled={saved} size={20} />
    </button>
  )
}
