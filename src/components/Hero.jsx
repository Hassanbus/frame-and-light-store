import { Link } from 'react-router'
import { HERO_ID } from '../data/products.js'
import { getProductById } from '../utils/catalog.js'
import Icon from './Icon.jsx'
import ProductImage from './ProductImage.jsx'
import './Hero.css'

const heroProduct = getProductById(HERO_ID)

// The big welcome block at the top of the home page.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">Photography prints</p>
          <h1 id="hero-title">Quiet places, printed for your walls.</h1>
          <p className="hero-lead">
            24 calm photographs of forests, cities, the ocean, mountains and the night sky.
            Three sizes, from A4 to A2.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="button">
              Shop all prints <Icon name="arrow" size={18} />
            </Link>
            <a href="#categories" className="button button-secondary">
              Browse categories
            </a>
          </div>
        </div>

        {/* The white border makes the photo look like a framed print: "Frame & Light". */}
        <figure className="hero-frame">
          <ProductImage product={heroProduct} sizes="(min-width: 768px) 50vw, 100vw" eager />
          <figcaption>
            <Link to={`/product/${heroProduct.id}`}>{heroProduct.title}</Link>, from{' '}
            {heroProduct.category}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
