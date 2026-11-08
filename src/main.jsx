import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CartProvider from './context/CartProvider.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import WishlistProvider from './context/WishlistProvider.jsx'
import './styles/tokens.css'
import './styles/base.css'
import './styles/buttons.css'

// The starting point of the app.
// WHY this order: the router is on the outside, so every part of the app can use links.
// The providers give shared state (toasts, cart, wishlist) to every page below them.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
