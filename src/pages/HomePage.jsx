import { Link } from 'react-router'
import CategoryGrid from '../components/CategoryGrid.jsx'
import Hero from '../components/Hero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { FEATURED_IDS } from '../data/products.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { getProductById } from '../utils/catalog.js'
import './HomePage.css'

const featured = FEATURED_IDS.map(getProductById)

const PROMISES = [
  { title: 'Free shipping over $100', text: 'Orders up to $100 ship for $8.' },
  { title: 'Three sizes', text: 'A4, A3 and A2 for every photo.' },
  { title: 'Cash on delivery', text: 'Demo only: nothing is charged.' },
]

export default function HomePage() {
  useDocumentTitle()

  return (
    <>
      <Hero />

      <section className="container section" aria-labelledby="featured-title">
        <div className="section-header">
          <h2 id="featured-title">Featured prints</h2>
          <Link to="/shop">View all prints</Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section id="categories" className="container section" aria-labelledby="categories-title">
        <div className="section-header">
          <h2 id="categories-title">Shop by category</h2>
        </div>
        <CategoryGrid />
      </section>

      <section className="container section" aria-label="Why shop with us">
        <ul className="promises">
          {PROMISES.map((promise) => (
            <li key={promise.title}>
              <strong>{promise.title}</strong>
              <span className="muted">{promise.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
