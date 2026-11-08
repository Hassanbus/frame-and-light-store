import { formatPrice, FREE_SHIPPING_OVER, getLineTotal, getShipping, getTotal } from '../utils/price.js'
import './OrderSummary.css'

// Subtotal, shipping and total, used by the cart page and the checkout page.
// "lines" is optional: the checkout page passes them to list the prints again.
// "children" are extra things at the bottom, like the "Go to checkout" button.
export default function OrderSummary({ subtotal, lines, title = 'Order summary', children }) {
  const shipping = getShipping(subtotal)

  return (
    <section className="order-summary" aria-labelledby="summary-title">
      <h2 id="summary-title" className="order-summary-title">
        {title}
      </h2>

      {lines && (
        <ul className="summary-items">
          {lines.map((line) => (
            <li key={line.key}>
              <span>
                {line.quantity} × {line.product.title} ({line.size})
              </span>
              <span>{formatPrice(getLineTotal(line))}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="summary-rows">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{formatPrice(getTotal(subtotal))}</dd>
        </div>
      </dl>

      <p className="summary-note">
        {shipping === 0
          ? 'Your order ships for free.'
          : `Free shipping on orders over ${formatPrice(FREE_SHIPPING_OVER)}.`}
      </p>

      {children}
    </section>
  )
}
