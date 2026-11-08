import { Link } from 'react-router'
import { formatPrice, getLineTotal, getUnitPrice } from '../utils/price.js'
import ProductImage from './ProductImage.jsx'
import QuantityInput from './QuantityInput.jsx'
import './CartLine.css'

// One row of the cart: photo, title, size, quantity, line total and a remove button.
export default function CartLine({ line, onQuantityChange, onRemove }) {
  const { product, size, quantity } = line
  const productUrl = `/product/${product.id}`

  return (
    <li className="cart-line">
      {/* WHY tabIndex -1 + aria-hidden: the title below is the same link,
          so keyboard and screen reader users meet it only once. */}
      <Link to={productUrl} className="cart-line-image" tabIndex={-1} aria-hidden="true">
        <ProductImage product={product} alt="" sizes="140px" />
      </Link>

      <div className="cart-line-info">
        <h2 className="cart-line-title">
          <Link to={productUrl}>{product.title}</Link>
        </h2>
        <p className="cart-line-meta">
          Size {size} · {formatPrice(getUnitPrice(product.basePrice, size))} each
        </p>
        <QuantityInput
          value={quantity}
          onChange={(value) => onQuantityChange(line.key, value)}
          label={`Quantity of ${product.title}, size ${size}`}
        />
      </div>

      <div className="cart-line-end">
        <p className="cart-line-total">{formatPrice(getLineTotal(line))}</p>
        <button type="button" className="link-button" onClick={() => onRemove(line)}>
          Remove<span className="visually-hidden"> {product.title}, size {size}</span>
        </button>
      </div>
    </li>
  )
}
