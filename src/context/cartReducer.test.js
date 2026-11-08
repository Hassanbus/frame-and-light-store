import { describe, expect, it } from 'vitest'
import { cartReducer, clampQuantity, MAX_QUANTITY, restoreCart } from './cartReducer.js'

// Helper: run several actions one after another, starting from an empty cart.
function run(actions, start = []) {
  return actions.reduce(cartReducer, start)
}

const addDune = { type: 'add', productId: 'dune-line', size: 'A4', quantity: 1 }

describe('cartReducer: add', () => {
  it('adds a new line', () => {
    expect(run([addDune])).toEqual([
      { key: 'dune-line|A4', productId: 'dune-line', size: 'A4', quantity: 1 },
    ])
  })

  it('uses quantity 1 when no quantity is given', () => {
    const cart = run([{ type: 'add', productId: 'dune-line', size: 'A4' }])
    expect(cart[0].quantity).toBe(1)
  })

  it('merges the same print in the same size into one line', () => {
    const cart = run([addDune, { ...addDune, quantity: 2 }])
    expect(cart).toHaveLength(1)
    expect(cart[0].quantity).toBe(3)
  })

  it('keeps the same print in another size as a separate line', () => {
    const cart = run([addDune, { ...addDune, size: 'A2' }])
    expect(cart.map((item) => item.key)).toEqual(['dune-line|A4', 'dune-line|A2'])
  })

  it(`never goes above ${MAX_QUANTITY}`, () => {
    const cart = run([{ ...addDune, quantity: 8 }, { ...addDune, quantity: 5 }])
    expect(cart[0].quantity).toBe(MAX_QUANTITY)
  })

  it('does not change the old array (it returns a new one)', () => {
    const before = run([addDune])
    const after = cartReducer(before, addDune)
    expect(before[0].quantity).toBe(1)
    expect(after).not.toBe(before)
  })
})

describe('cartReducer: setQuantity, remove, clear', () => {
  const start = run([addDune, { ...addDune, size: 'A3' }])

  it('changes the quantity of one line only', () => {
    const cart = cartReducer(start, { type: 'setQuantity', key: 'dune-line|A3', quantity: 4 })
    expect(cart.map((item) => item.quantity)).toEqual([1, 4])
  })

  it('keeps the quantity between 1 and the maximum', () => {
    expect(cartReducer(start, { type: 'setQuantity', key: 'dune-line|A4', quantity: 0 })[0].quantity).toBe(1)
    expect(cartReducer(start, { type: 'setQuantity', key: 'dune-line|A4', quantity: 99 })[0].quantity).toBe(10)
  })

  it('removes one line', () => {
    const cart = cartReducer(start, { type: 'remove', key: 'dune-line|A4' })
    expect(cart.map((item) => item.key)).toEqual(['dune-line|A3'])
  })

  it('clears the whole cart', () => {
    expect(cartReducer(start, { type: 'clear' })).toEqual([])
  })

  it('throws on an unknown action', () => {
    expect(() => cartReducer(start, { type: 'fly' })).toThrow('Unknown cart action: fly')
  })
})

describe('clampQuantity', () => {
  it('turns bad input into a safe number', () => {
    expect(clampQuantity('3')).toBe(3)
    expect(clampQuantity('abc')).toBe(1)
    expect(clampQuantity(-2)).toBe(1)
    expect(clampQuantity(2.7)).toBe(2)
  })
})

describe('restoreCart (data from localStorage)', () => {
  it('returns an empty cart when the saved value is not an array', () => {
    expect(restoreCart(null)).toEqual([])
    expect(restoreCart({ hello: 'world' })).toEqual([])
  })

  it('drops unknown products and sizes, merges duplicates and fixes quantities', () => {
    const saved = [
      { productId: 'dune-line', size: 'A4', quantity: 2 },
      { productId: 'dune-line', size: 'A4', quantity: 1 },
      { productId: 'deleted-print', size: 'A4', quantity: 1 },
      { productId: 'snow-peak', size: 'XXL', quantity: 1 },
      { productId: 'snow-peak', size: 'A2', quantity: 500 },
      null,
    ]
    expect(restoreCart(saved)).toEqual([
      { key: 'dune-line|A4', productId: 'dune-line', size: 'A4', quantity: 3 },
      { key: 'snow-peak|A2', productId: 'snow-peak', size: 'A2', quantity: 10 },
    ])
  })
})
