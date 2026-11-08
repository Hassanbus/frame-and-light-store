import { useEffect } from 'react'
import { useLocation } from 'react-router'

// WHY: in a single-page app the browser does not reload, so it keeps the old
// scroll position when you open a new page. Real websites start at the top.
// We only watch the pathname, so changing a shop filter (?q=...) does not jump.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
