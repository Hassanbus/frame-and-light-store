import { MAX_QUANTITY } from '../context/cartReducer.js'
import Icon from './Icon.jsx'
import './QuantityInput.css'

// A small "− 2 +" control.
// WHY no text box: the value can only change with the two buttons,
// so it can never be empty, negative or bigger than the maximum.
export default function QuantityInput({ value, onChange, label }) {
  const canDecrease = value > 1
  const canIncrease = value < MAX_QUANTITY

  return (
    <div className="quantity" role="group" aria-label={label}>
      {/* WHY aria-disabled instead of disabled: a disabled button loses keyboard focus. */}
      <button
        type="button"
        className="quantity-button"
        aria-label="Decrease quantity"
        aria-disabled={!canDecrease}
        onClick={() => canDecrease && onChange(value - 1)}
      >
        <Icon name="minus" size={18} />
      </button>
      <output className="quantity-value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="quantity-button"
        aria-label="Increase quantity"
        aria-disabled={!canIncrease}
        onClick={() => canIncrease && onChange(value + 1)}
      >
        <Icon name="plus" size={18} />
      </button>
    </div>
  )
}
