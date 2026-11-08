// Checks the checkout form.
// It returns one message per wrong field, for example { email: '...' }.
// An empty object {} means: everything is fine.
// WHY a plain function: it is easy to test and does not need React.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ // something@something.xx
const PHONE_CHARACTERS = /^[0-9+()\-.\s]+$/ // digits, +, (, ), -, dots and spaces

export function validateCheckout(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const phoneDigits = phone.replace(/\D/g, '')
  const address = values.address.trim()
  const city = values.city.trim()

  if (name === '') errors.name = 'Please enter your full name.'
  else if (name.length < 2) errors.name = 'Your name looks too short.'

  if (email === '') errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'This email does not look right. Example: name@example.com'

  if (phone === '') errors.phone = 'Please enter your phone number.'
  else if (!PHONE_CHARACTERS.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Use 7 to 15 digits. You may also use +, spaces and dashes.'
  }

  if (address === '') errors.address = 'Please enter your street and house number.'
  else if (address.length < 5) errors.address = 'This address looks too short.'

  if (city === '') errors.city = 'Please enter your city.'
  else if (city.length < 2) errors.city = 'This city name looks too short.'

  return errors
}
