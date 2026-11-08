import { describe, expect, it } from 'vitest'
import { createOrderNumber } from './order.js'

describe('createOrderNumber', () => {
  const date = new Date(2026, 10, 8) // 8 November 2026 (months count from 0)

  it('combines the date and four random digits', () => {
    expect(createOrderNumber(date, () => 0.0427)).toBe('FL-261108-0427')
  })

  it('always has four digits at the end', () => {
    expect(createOrderNumber(date, () => 0)).toBe('FL-261108-0000')
    expect(createOrderNumber(date, () => 0.99999)).toBe('FL-261108-9999')
  })

  it('has the expected shape with the real date and Math.random', () => {
    expect(createOrderNumber()).toMatch(/^FL-\d{6}-\d{4}$/)
  })
})
