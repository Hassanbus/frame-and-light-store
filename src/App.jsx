import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ShopPage from './pages/ShopPage.jsx'

// The map of the website: which URL shows which page.
// Every page sits inside <Layout>, so all pages share the navbar and the footer.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
