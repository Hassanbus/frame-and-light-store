import { Link } from 'react-router'
import EmptyState from '../components/EmptyState.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useWishlist } from '../context/wishlistContext.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { getProductById } from '../utils/catalog.js'

export default function WishlistPage() {
  useDocumentTitle('Wishlist')
  const { ids } = useWishlist()
  // The wishlist stores only ids. Here we turn them back into full products.
  const saved = ids.map(getProductById).filter(Boolean)

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Your wishlist</h1>
        {saved.length > 0 && (
          <p className="muted">
            {saved.length === 1 ? '1 saved print' : `${saved.length} saved prints`}. Tap the heart
            again to remove a print.
          </p>
        )}
      </header>

      {saved.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your wishlist is empty"
          text="Tap the heart on any print to save it here for later."
          actions={
            <Link to="/shop" className="button">
              Browse prints
            </Link>
          }
        />
      ) : (
        <section aria-labelledby="saved-title">
          {/* Hidden heading: the cards use <h3>, so the page keeps a clean h1 > h2 > h3 order. */}
          <h2 id="saved-title" className="visually-hidden">
            Saved prints
          </h2>
          <ProductGrid products={saved} />
        </section>
      )}
    </div>
  )
}
