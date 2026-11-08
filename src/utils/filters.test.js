import { describe, expect, it } from 'vitest'
import { filterProducts, readFilters } from './filters.js'

const items = [
  { id: 'a', title: 'Blue Sea', category: 'Ocean', basePrice: 30, createdAt: '2026-01-01', description: 'Waves.' },
  { id: 'b', title: 'Alpine', category: 'Mountains', basePrice: 50, createdAt: '2026-03-01', description: 'Snow and rock.' },
  { id: 'c', title: 'Night Owl', category: 'Night', basePrice: 20, createdAt: '2026-02-01', description: 'Stars above the sea.' },
]

const noFilters = { q: '', category: '', min: null, max: null, sort: 'newest' }
const ids = (list) => list.map((item) => item.id)

describe('readFilters', () => {
  it('uses safe defaults when the URL has no filters', () => {
    expect(readFilters(new URLSearchParams(''))).toEqual(noFilters)
  })

  it('reads every filter from the URL', () => {
    const params = new URLSearchParams('q=fog&category=Minimal&min=20&max=40&sort=price-asc')
    expect(readFilters(params)).toEqual({ q: 'fog', category: 'Minimal', min: 20, max: 40, sort: 'price-asc' })
  })

  it('accepts a category in any letter case', () => {
    expect(readFilters(new URLSearchParams('category=night')).category).toBe('Night')
  })

  it('ignores unknown or broken values', () => {
    const params = new URLSearchParams('category=Space&sort=random&min=abc&max=-5')
    expect(readFilters(params)).toEqual(noFilters)
  })
})

describe('filterProducts', () => {
  it('searches in the title, category and description (case does not matter)', () => {
    expect(ids(filterProducts(items, { ...noFilters, q: 'SEA' }))).toEqual(['c', 'a'])
  })

  it('filters by category', () => {
    expect(ids(filterProducts(items, { ...noFilters, category: 'Ocean' }))).toEqual(['a'])
  })

  it('filters by price range (both ends included)', () => {
    expect(ids(filterProducts(items, { ...noFilters, min: 20, max: 30 }))).toEqual(['c', 'a'])
  })

  it('sorts by newest, price and name', () => {
    expect(ids(filterProducts(items, noFilters))).toEqual(['b', 'c', 'a'])
    expect(ids(filterProducts(items, { ...noFilters, sort: 'price-asc' }))).toEqual(['c', 'a', 'b'])
    expect(ids(filterProducts(items, { ...noFilters, sort: 'price-desc' }))).toEqual(['b', 'a', 'c'])
    expect(ids(filterProducts(items, { ...noFilters, sort: 'name' }))).toEqual(['b', 'a', 'c'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterProducts(items, { ...noFilters, q: 'volcano' })).toEqual([])
  })

  it('does not change the original list', () => {
    filterProducts(items, { ...noFilters, sort: 'price-asc' })
    expect(ids(items)).toEqual(['a', 'b', 'c'])
  })
})
