import { useEffect, useState } from 'react'
import { saveState } from '../utils/storage.js'

export const THEME_KEY = 'fl-theme'

// The small script in index.html already put the right theme on <html>
// before React started (WHY: so dark mode users never see a white flash).
// Here we simply read that value as our starting point.
function readStartTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(readStartTheme)

  // Keep the <html data-theme="..."> attribute in sync. The CSS variables
  // in tokens.css change their values when this attribute changes.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    // WHY save only here: we remember a theme only when the user really chose one.
    saveState(THEME_KEY, next)
  }

  return { theme, toggleTheme }
}
