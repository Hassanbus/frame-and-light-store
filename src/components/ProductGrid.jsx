import ProductCard from './ProductCard.jsx'
import './ProductGrid.css'

// A responsive grid of product cards.
// WHY a list (<ul>): screen readers can say "list, 8 items", which helps orientation.
export default function ProductGrid({ products }) {
  // WHY: on tablets the grid has 3 columns, so 4 prints would show as 3 + 1.
  // Exactly 4 prints (featured, related, one category) look better as 2 + 2.
  const className = products.length === 4 ? 'product-grid product-grid-four' : 'product-grid'

  return (
    <ul className={className}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
