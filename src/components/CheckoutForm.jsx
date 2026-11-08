import { useRef, useState } from 'react'
import { validateCheckout } from '../utils/validation.js'
import FormField from './FormField.jsx'
import './CheckoutForm.css'

const FIELDS = [
  { name: 'name', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'address', label: 'Street and house number', autoComplete: 'street-address' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
]

const EMPTY_FORM = { name: '', email: '', phone: '', address: '', city: '' }

export default function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    // A field that already shows an error is checked again while typing,
    // so the message goes away as soon as the value is correct.
    if (errors[name]) setErrors({ ...errors, [name]: validateCheckout(next)[name] })
  }

  // Leaving a field you typed in checks it. (Empty fields wait for "Place order".)
  function handleBlur(event) {
    const { name, value } = event.target
    if (value.trim() !== '') setErrors({ ...errors, [name]: validateCheckout(values)[name] })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateCheckout(values)
    setErrors(found)
    const firstWrong = FIELDS.find((field) => found[field.name])
    if (firstWrong) {
      // WHY: move keyboard focus to the first wrong field, so the user sees what to fix.
      formRef.current.elements.namedItem(firstWrong.name).focus()
      return
    }
    onPlaceOrder(values)
  }

  return (
    // WHY noValidate: we show our own clear messages instead of the browser's pop-ups.
    <form ref={formRef} className="checkout-form" noValidate onSubmit={handleSubmit}>
      <fieldset className="checkout-section">
        <legend>Delivery details</legend>
        <div className="checkout-fields">
          {FIELDS.map((field) => (
            <FormField
              key={field.name}
              {...field}
              value={values[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="checkout-section">
        <legend>Payment</legend>
        {/* The only option. There are no card fields: this is a demo store. */}
        <label className="payment-option">
          <input type="radio" name="payment" value="cash-on-delivery" defaultChecked />
          <span>
            <strong>Cash on delivery (demo)</strong>
            <span className="field-hint">No card needed. Nothing is charged and nothing is delivered.</span>
          </span>
        </label>
      </fieldset>

      <button type="submit" className="button button-block">
        Place demo order
      </button>
    </form>
  )
}
