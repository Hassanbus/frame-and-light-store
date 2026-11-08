import { describe, expect, it } from 'vitest'
import { getImageSrc, getProductById, getRelatedProducts } from './catalog.js'

const fakeProducts = [
  { id: 'a', category: 'Ocean' },
  { id: 'b', category: 'City' },
  { id: 'c', category: 'Ocean' },
  { id: 'd', category: 'Night' },
  { id: 'e', category: 'Ocean' },
]

describe('getProductById', () => {
  it('finds a real product', () => {
    expect(getProductById('dune-line').title).toBe('Dune Line')
  })

  it('returns undefined for an unknown id', () => {
    expect(getProductById('does-not-exist')).toBeUndefined()
  })
})

describe('getRelatedProducts', () => {
  it('puts the same category first and never includes the product itself', () => {
    const related = getRelatedProducts(fakeProducts[0], fakeProducts)
    expect(related.map((p) => p.id)).toEqual(['c', 'e', 'b', 'd'])
  })

  it('respects the limit', () => {
    expect(getRelatedProducts(fakeProducts[0], fakeProducts, 2)).toHaveLength(2)
  })
})

describe('getImageSrc', () => {
  it('builds the local image path for a width', () => {
    expect(getImageSrc({ imageSeed: 'fl-14' }, 600)).toBe('/images/fl-14-600.jpg')
  })
})
