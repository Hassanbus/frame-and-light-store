import { describe, expect, it } from 'vitest'
import { validateCheckout } from './validation.js'

const valid = {
  name: 'Sam Rivera',
  email: 'sam@example.com',
  phone: '+1 (555) 123-4567',
  address: '12 Harbor Street',
  city: 'Portland',
}

describe('validateCheckout', () => {
  it('returns no errors for a correct form', () => {
    expect(validateCheckout(valid)).toEqual({})
  })

  it('asks for every field when the form is empty (spaces count as empty)', () => {
    const errors = validateCheckout({ name: '  ', email: '', phone: '', address: '', city: '' })
    expect(Object.keys(errors).sort()).toEqual(['address', 'city', 'email', 'name', 'phone'])
    expect(errors.name).toBe('Please enter your full name.')
  })

  it('rejects emails without a proper domain', () => {
    expect(validateCheckout({ ...valid, email: 'sam@' }).email).toMatch(/does not look right/)
    expect(validateCheckout({ ...valid, email: 'sam@example.c' }).email).toMatch(/does not look right/)
    expect(validateCheckout({ ...valid, email: 'sam@mail.co' }).email).toBeUndefined()
  })

  it('accepts common phone formats and rejects letters or too few digits', () => {
    expect(validateCheckout({ ...valid, phone: '0612 345 678' }).phone).toBeUndefined()
    expect(validateCheckout({ ...valid, phone: 'call me' }).phone).toMatch(/7 to 15 digits/)
    expect(validateCheckout({ ...valid, phone: '12345' }).phone).toMatch(/7 to 15 digits/)
  })

  it('rejects very short names, addresses and cities', () => {
    const errors = validateCheckout({ ...valid, name: 'S', address: 'Main', city: 'X' })
    expect(Object.keys(errors).sort()).toEqual(['address', 'city', 'name'])
  })
})
