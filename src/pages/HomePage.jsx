import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

// Temporary home page. The real hero, featured prints and categories come next.
export default function HomePage() {
  useDocumentTitle()

  return (
    <div className="container page">
      <h1>Frame &amp; Light</h1>
      <p className="muted">Photography prints for calm spaces.</p>
    </div>
  )
}
