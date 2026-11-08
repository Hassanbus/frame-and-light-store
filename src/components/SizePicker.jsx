import { SIZES } from '../data/sizes.js'
import { formatPrice, getUnitPrice } from '../utils/price.js'
import './SizePicker.css'

// Radio buttons that look like cards.
// WHY real radio inputs: arrow keys and screen readers work without extra code,
// and each option says its size, dimensions and price.
export default function SizePicker({ basePrice, value, onChange }) {
  return (
    <fieldset className="size-picker">
      <legend>Size</legend>
      <div className="size-options">
        {SIZES.map((size) => (
          <label key={size.id} className="size-option">
            <input
              type="radio"
              name="size"
              value={size.id}
              checked={value === size.id}
              onChange={() => onChange(size.id)}
            />
            <span className="size-name">{size.id}</span>
            <span className="size-dimensions">{size.dimensions}</span>
            <span className="size-price">{formatPrice(getUnitPrice(basePrice, size.id))}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
