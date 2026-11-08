import { useState } from 'react'
import { useCart } from '../context/cartContext.js'
import { useToast } from '../context/toastContext.js'
import { DEFAULT_SIZE } from '../data/sizes.js'
import { formatPrice, FREE_SHIPPING_OVER, getUnitPrice } from '../utils/price.js'
import Icon from './Icon.jsx'
import QuantityInput from './QuantityInput.jsx'
import SizePicker from './SizePicker.jsx'
import WishlistButton from './WishlistButton.jsx'
import './BuyBox.css'

// Everything you need to buy one print: size, quantity, price and the buttons.
export default function BuyBox({ product }) {
  const [size, setSize] = useState(DEFAULT_SIZE)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { showToast } = useToast()
  const unitPrice = getUnitPrice(product.basePrice, size)

  function handleAddToCart() {
    addItem(product.id, size, quantity)
    showToast(`Added ${quantity} × ${product.title} (${size}) to your cart`)
  }

  return (
    <div className="buy-box">
      <p className="product-price">
        {formatPrice(unitPrice)} <span className="muted">per print, size {size}</span>
      </p>

      <SizePicker basePrice={product.basePrice} value={size} onChange={setSize} />

      <div className="buy-row">
        <QuantityInput value={quantity} onChange={setQuantity} label={`Quantity of ${product.title}`} />
        <button type="button" className="button add-to-cart" onClick={handleAddToCart}>
          <Icon name="bag" size={20} />
          Add to cart · {formatPrice(unitPrice * quantity)}
        </button>
      </div>

      <WishlistButton product={product} withText />

      <p className="buy-note">
        Free shipping on orders over {formatPrice(FREE_SHIPPING_OVER)}. Frame not included.
        Demo store: nothing is really sold.
      </p>
    </div>
  )
}
