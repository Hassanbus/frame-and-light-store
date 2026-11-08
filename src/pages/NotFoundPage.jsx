import { Link } from 'react-router'
import EmptyState from '../components/EmptyState.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

// Shown for every URL that does not match a route (the "*" route in App.jsx).
export default function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="container page">
      <EmptyState
        icon="search"
        headingLevel={1}
        title="Page not found"
        text="We could not find this page. The link may be wrong, or the page may have moved."
        actions={
          <>
            <Link to="/shop" className="button">
              Browse prints
            </Link>
            <Link to="/" className="button button-secondary">
              Back to home
            </Link>
          </>
        }
      />
    </div>
  )
}
