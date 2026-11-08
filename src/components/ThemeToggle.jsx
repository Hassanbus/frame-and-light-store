import { useTheme } from '../hooks/useTheme.js'
import Icon from './Icon.jsx'

// A button that switches between light and dark mode.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {/* Show the moon in light mode and the sun in dark mode: the icon shows where you go. */}
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}
