import { Outlet } from 'react-router'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import './Layout.css'

// The frame around every page: navbar on top, footer at the bottom.
// <Outlet /> is the place where React Router shows the current page.
export default function Layout() {
  return (
    <>
      {/* WHY: keyboard users can jump over the menu straight to the content. */}
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
