import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ToastProvider from './context/ToastProvider.jsx'
import './styles/tokens.css'
import './styles/base.css'
import './styles/buttons.css'

// The starting point of the app.
// WHY this order: the router is on the outside, so every part of the app can use links.
// The providers give shared state (like toasts) to every page below them.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
