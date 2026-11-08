import { Link } from 'react-router'
import { CATEGORIES, CATEGORY_COVERS, products } from '../data/products.js'
import { getProductById } from '../utils/catalog.js'
import ProductImage from './ProductImage.jsx'
import './CategoryGrid.css'

// Built once when the file loads: the data never changes while the app runs.
const cards = CATEGORIES.map((name) => ({
  name,
  count: products.filter((product) => product.category === name).length,
  cover: getProductById(CATEGORY_COVERS[name]),
}))

// Six category cards. Each one opens the shop with that category already filtered.
export default function CategoryGrid() {
  return (
    <ul className="category-grid">
      {cards.map(({ name, count, cover }) => (
        <li key={name}>
          <Link to={`/shop?category=${name}`} className="category-card">
            {/* WHY alt="": the link text already says the category, the photo is decoration. */}
            <ProductImage product={cover} alt="" sizes="(min-width: 768px) 33vw, 50vw" />
            <span className="category-card-text">
              <span className="category-card-name">{name}</span>
              <span className="category-card-count">{count} prints</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
