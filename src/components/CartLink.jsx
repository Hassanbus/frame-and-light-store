import { Link } from 'react-router'
import { useCart } from '../context/cartContext.js'
import Icon from './Icon.jsx'
import './CartLink.css'

// The bag icon in the navbar, with a small badge that shows how many prints are in the cart.
export default function CartLink({ onClick }) {
  const { count } = useCart()
  // WHY aria-label: a screen reader hears "Cart, 3 items" instead of just a number.
  const label = count === 1 ? 'Cart, 1 item' : `Cart, ${count} items`

  return (
    <Link to="/cart" className="icon-button" aria-label={label} title="Cart" onClick={onClick}>
      <Icon name="bag" />
      {count > 0 && (
        <span className="badge" aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
