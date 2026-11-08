import { useRef } from 'react'
import { Link } from 'react-router'
import CartLine from '../components/CartLine.jsx'
import EmptyState from '../components/EmptyState.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { useCart } from '../context/cartContext.js'
import { useToast } from '../context/toastContext.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import './CartPage.css'

export default function CartPage() {
  useDocumentTitle('Cart')
  const { lines, count, subtotal, setQuantity, removeItem } = useCart()
  const { showToast } = useToast()
  const headingRef = useRef(null)

  function handleRemove(line) {
    removeItem(line.key)
    showToast(`Removed ${line.product.title} (${line.size}) from your cart`)
    // WHY: the Remove button disappears with its row, so keyboard focus
    // would be lost. We move it to the page title instead.
    headingRef.current.focus()
  }

  return (
    <div className="container page">
      <header className="page-header">
        <h1 ref={headingRef} tabIndex={-1}>
          Your cart
        </h1>
        {count > 0 && <p className="muted">{count === 1 ? '1 print' : `${count} prints`}</p>}
      </header>

      {lines.length === 0 ? (
        <EmptyState
          icon="bag"
          title="Your cart is empty"
          text="Find a print you love and add it to your cart."
          actions={
            <Link to="/shop" className="button">
              Browse prints
            </Link>
          }
        />
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines" aria-label="Prints in your cart">
            {lines.map((line) => (
              <CartLine key={line.key} line={line} onQuantityChange={setQuantity} onRemove={handleRemove} />
            ))}
          </ul>

          <OrderSummary subtotal={subtotal}>
            <Link to="/checkout" className="button button-block">
              Go to checkout
            </Link>
            <Link to="/shop" className="continue-link">
              Continue shopping
            </Link>
          </OrderSummary>
        </div>
      )}
    </div>
  )
}
