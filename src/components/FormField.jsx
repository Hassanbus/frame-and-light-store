// One labelled input with its error message.
// WHY aria-invalid + aria-describedby: screen readers say "invalid" and read
// the error message together with the field name.
export default function FormField({ name, label, type = 'text', autoComplete, value, error, onChange, onBlur }) {
  const inputId = `checkout-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        name={name}
        type={type}
        className="input"
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}
