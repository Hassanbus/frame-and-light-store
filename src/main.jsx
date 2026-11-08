// WHY the global CSS comes first: CSS that loads later wins when two rules are
// equally strong. Components import their own CSS, which must be able to
// override these shared styles, so the shared styles must load before them.
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/buttons.css'
import './styles/forms.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CartProvider from './context/CartProvider.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import WishlistProvider from './context/WishlistProvider.jsx'

// The starting point of the app.
// WHY this order: the router is on the outside, so every part of the app can use links.
// The providers give shared state (toasts, cart, wishlist) to every page below them.
//
// WHY useTransitions={false}: by default React Router updates the URL state as a
// low-priority "transition". Our shop filters are inputs whose values live in the URL,
// and with transitions a fast second change could use old filter values (we saw this
// in a browser test). This app loads no data, so simple, immediate updates are better.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter useTransitions={false}>
      <ScrollToTop />
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
