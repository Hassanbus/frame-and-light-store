import { Link, useNavigate } from 'react-router'
import CheckoutForm from '../components/CheckoutForm.jsx'
import EmptyState from '../components/EmptyState.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { useCart } from '../context/cartContext.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { createOrderNumber } from '../utils/order.js'
import { getTotal } from '../utils/price.js'
import './CheckoutPage.css'

export default function CheckoutPage() {
  useDocumentTitle('Checkout')
  const { lines, count, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  function handlePlaceOrder(customer) {
    const order = {
      number: createOrderNumber(),
      name: customer.name.trim(),
      email: customer.email.trim(),
      count,
      total: getTotal(subtotal),
    }
    // Both updates happen in the same event, so React draws the confirmation page
    // and the empty cart in one go (see useTransitions={false} in main.jsx).
    clearCart()
    // WHY replace: the Back button should not return to a checkout of an empty cart.
    // WHY state: the order travels to the next page without a server or localStorage.
    navigate('/order-confirmation', { replace: true, state: { order } })
  }

  if (lines.length === 0) {
    return (
      <div className="container page">
        <h1>Checkout</h1>
        <EmptyState
          icon="bag"
          title="Your cart is empty"
          text="Add a print to your cart first, then come back to check out."
          actions={
            <Link to="/shop" className="button">
              Browse prints
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Checkout</h1>
      </header>

      <p className="demo-banner" role="note">
        <strong>Demo project, not a real store.</strong> There is no payment and nothing is shipped.
        What you type stays in your browser, but please do not use real personal data.
      </p>

      <div className="checkout-layout">
        <CheckoutForm onPlaceOrder={handlePlaceOrder} />
        <OrderSummary subtotal={subtotal} lines={lines} title="Your order" />
      </div>
    </div>
  )
}
