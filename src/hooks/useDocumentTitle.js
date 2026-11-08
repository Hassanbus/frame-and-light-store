import { useEffect } from 'react'

// Sets the text in the browser tab for each page.
// WHY: it helps people with many open tabs, and screen readers announce it.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Frame & Light` : 'Frame & Light | Photography prints'
  }, [title])
}
