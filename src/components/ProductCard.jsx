import { Link } from 'react-router'
import { formatPrice } from '../utils/price.js'
import ProductImage from './ProductImage.jsx'
import WishlistButton from './WishlistButton.jsx'
import './ProductCard.css'

// WHY these sizes: 2 columns on phones, 3 on tablets, 4 on desktops (see ProductGrid.css).
const CARD_IMAGE_SIZES = '(min-width: 1024px) 280px, (min-width: 768px) 30vw, 46vw'

// One print in a grid. Only the title is a link, but CSS stretches the link
// over the whole card, so the full card is clickable (see .product-card-link::after).
export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        <ProductImage product={product} sizes={CARD_IMAGE_SIZES} />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`} className="product-card-link">
            {product.title}
          </Link>
        </h3>
        <p className="product-card-meta">
          <span>{product.category}</span>
          <span>From {formatPrice(product.basePrice)}</span>
        </p>
      </div>
      <WishlistButton product={product} className="product-card-wishlist" />
    </article>
  )
}
