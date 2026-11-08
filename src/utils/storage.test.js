import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadState, saveState } from './storage.js'

// A tiny fake of the browser's localStorage, so these tests can run in Node.
function createFakeStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('storage helpers', () => {
  it('saves a value and loads the same value back', () => {
    vi.stubGlobal('localStorage', createFakeStorage())
    expect(saveState('test-key', [{ id: 'p01', quantity: 2 }])).toBe(true)
    expect(loadState('test-key', [])).toEqual([{ id: 'p01', quantity: 2 }])
  })

  it('returns the fallback when nothing is saved', () => {
    vi.stubGlobal('localStorage', createFakeStorage())
    expect(loadState('missing-key', 'default')).toBe('default')
  })

  it('returns the fallback when the saved text is not valid JSON', () => {
    const storage = createFakeStorage()
    storage.setItem('broken', '{not json')
    vi.stubGlobal('localStorage', storage)
    expect(loadState('broken', [])).toEqual([])
  })

  it('does not crash when localStorage throws an error', () => {
    vi.stubGlobal('localStorage', {
      getItem() {
        throw new Error('storage is blocked')
      },
      setItem() {
        throw new Error('storage is full')
      },
    })
    expect(loadState('any-key', 'default')).toBe('default')
    expect(saveState('any-key', 1)).toBe(false)
  })
})
