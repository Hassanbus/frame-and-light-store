import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import EmptyState from '../components/EmptyState.jsx'
import Icon from '../components/Icon.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { formatPrice } from '../utils/price.js'
import './ConfirmationPage.css'

export default function ConfirmationPage() {
  useDocumentTitle('Order confirmed')
  // The checkout page sends the order here inside the navigation "state".
  const order = useLocation().state?.order
  const headingRef = useRef(null)

  // WHY: move focus to the title, so screen reader users hear that the order worked.
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  if (!order) {
    return (
      <div className="container page">
        <EmptyState
          icon="bag"
          headingLevel={1}
          title="No order to show"
          text="The confirmation appears right after you place an order."
          actions={
            <Link to="/shop" className="button">
              Browse prints
            </Link>
          }
        />
      </div>
    )
  }

  const firstName = order.name.split(' ')[0]

  return (
    <div className="container page">
      <section className="confirmation">
        <div className="confirmation-icon">
          <Icon name="check" size={32} />
        </div>
        <h1 ref={headingRef} tabIndex={-1}>
          Thank you, {firstName}!
        </h1>
        <p className="muted">Your demo order has been placed.</p>

        <p className="order-number">
          Order number <strong>{order.number}</strong>
        </p>

        <dl className="confirmation-details">
          <div>
            <dt>Prints</dt>
            <dd>{order.count}</dd>
          </div>
          <div>
            <dt>Total, cash on delivery</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{order.email}</dd>
          </div>
        </dl>

        <p className="demo-banner" role="note">
          <strong>Demo project, not a real store.</strong> Nothing was charged, no email was sent and
          nothing will be shipped.
        </p>

        <Link to="/shop" className="button">
          Continue shopping
        </Link>
      </section>
    </div>
  )
}
