import { Link, useParams } from 'react-router'
import BuyBox from '../components/BuyBox.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { getProductById, getRelatedProducts } from '../utils/catalog.js'
import './ProductPage.css'

export default function ProductPage() {
  // The ":id" part of the route "/product/:id", for example "dune-line".
  const { id } = useParams()
  const product = getProductById(id)
  useDocumentTitle(product ? product.title : 'Print not found')

  if (!product) {
    return (
      <div className="container page">
        <EmptyState
          icon="search"
          headingLevel={1}
          title="Print not found"
          text="We could not find this print. The link may be wrong."
          actions={
            <Link to="/shop" className="button">
              Back to the shop
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container page">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
          </li>
          <li aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="product-layout">
        <figure className="product-frame">
          <ProductImage product={product} sizes="(min-width: 960px) 60vw, 100vw" eager />
        </figure>

        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          {/* WHY key: when you open another print, React starts a fresh buy box
              (size A4, quantity 1) instead of keeping the old choices. */}
          <BuyBox key={product.id} product={product} />
        </div>
      </div>

      <section className="section" aria-labelledby="related-title">
        <div className="section-header">
          <h2 id="related-title">You may also like</h2>
        </div>
        <ProductGrid products={getRelatedProducts(product)} />
      </section>
    </div>
  )
}
