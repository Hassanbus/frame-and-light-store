import { describe, expect, it } from 'vitest'
import { restoreWishlist, wishlistReducer } from './wishlistReducer.js'

describe('wishlistReducer', () => {
  it('adds a print on the first toggle and removes it on the second', () => {
    const once = wishlistReducer([], { type: 'toggle', productId: 'snow-peak' })
    expect(once).toEqual(['snow-peak'])
    expect(wishlistReducer(once, { type: 'toggle', productId: 'snow-peak' })).toEqual([])
  })

  it('removes one print', () => {
    const ids = ['snow-peak', 'dune-line']
    expect(wishlistReducer(ids, { type: 'remove', productId: 'snow-peak' })).toEqual(['dune-line'])
  })

  it('throws on an unknown action', () => {
    expect(() => wishlistReducer([], { type: 'fly' })).toThrow()
  })
})

describe('restoreWishlist', () => {
  it('keeps only real product ids, once each', () => {
    expect(restoreWishlist(['snow-peak', 'snow-peak', 'not-a-print'])).toEqual(['snow-peak'])
  })

  it('returns an empty list for broken data', () => {
    expect(restoreWishlist('oops')).toEqual([])
  })
})
