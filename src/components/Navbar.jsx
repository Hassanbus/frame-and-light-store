import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import CartLink from './CartLink.jsx'
import Icon from './Icon.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/wishlist', label: 'Wishlist' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  // Keyboard users can close the open mobile menu with the Escape key.
  function handleKeyDown(event) {
    if (event.key === 'Escape') closeMenu()
  }

  return (
    <header className="site-header" onKeyDown={handleKeyDown}>
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          Frame <span className="logo-amp">&amp;</span> Light
        </Link>

        <nav aria-label="Main">
          {/* WHY the button comes first: after opening the menu, the next Tab goes into the links. */}
          <button
            type="button"
            className="icon-button menu-button"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
            <span className="visually-hidden">Menu</span>
          </button>

          <ul id="main-menu" className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
            {LINKS.map((link) => (
              <li key={link.to}>
                {/* "end" makes Home active only on "/" and not on every page. */}
                <NavLink to={link.to} end={link.to === '/'} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <CartLink onClick={closeMenu} />
        </div>
      </div>
    </header>
  )
}
