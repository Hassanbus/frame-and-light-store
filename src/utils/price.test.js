import { describe, expect, it } from 'vitest'
import {
  formatPrice,
  getLineTotal,
  getShipping,
  getSubtotal,
  getTotal,
  getUnitPrice,
} from './price.js'

// Small fake products, so the tests do not break when the real catalog changes.
const cheapPrint = { id: 'a', basePrice: 20 }
const bigPrint = { id: 'b', basePrice: 40 }

describe('getUnitPrice', () => {
  it('uses the base price for A4', () => {
    expect(getUnitPrice(20, 'A4')).toBe(20)
  })

  it('adds $15 for A3 and $35 for A2', () => {
    expect(getUnitPrice(20, 'A3')).toBe(35)
    expect(getUnitPrice(20, 'A2')).toBe(55)
  })

  it('falls back to the base price for an unknown size', () => {
    expect(getUnitPrice(20, 'XXL')).toBe(20)
  })
})

describe('getLineTotal and getSubtotal', () => {
  it('multiplies the unit price by the quantity', () => {
    expect(getLineTotal({ product: cheapPrint, size: 'A3', quantity: 3 })).toBe(105)
  })

  it('adds all lines together', () => {
    const lines = [
      { product: cheapPrint, size: 'A4', quantity: 2 }, // 2 x 20 = 40
      { product: bigPrint, size: 'A2', quantity: 1 }, // 1 x 75 = 75
    ]
    expect(getSubtotal(lines)).toBe(115)
  })

  it('returns 0 for an empty cart', () => {
    expect(getSubtotal([])).toBe(0)
  })
})

describe('getShipping', () => {
  it('costs $8 when the subtotal is $100 or less', () => {
    expect(getShipping(20)).toBe(8)
    expect(getShipping(100)).toBe(8)
  })

  it('is free when the subtotal is over $100', () => {
    expect(getShipping(101)).toBe(0)
    expect(getShipping(250)).toBe(0)
  })

  it('is $0 for an empty cart', () => {
    expect(getShipping(0)).toBe(0)
  })
})

describe('getTotal', () => {
  it('adds shipping to small orders', () => {
    expect(getTotal(60)).toBe(68)
  })

  it('does not add shipping to orders over $100', () => {
    expect(getTotal(120)).toBe(120)
  })

  it('is $0 for an empty cart', () => {
    expect(getTotal(0)).toBe(0)
  })
})

describe('formatPrice', () => {
  it('formats dollars with two decimals and commas', () => {
    expect(formatPrice(28)).toBe('$28.00')
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })
})
