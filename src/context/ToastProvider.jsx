import { useCallback, useMemo, useState } from 'react'
import ToastList from '../components/ToastList.jsx'
import { ToastContext } from './toastContext.js'

const TOAST_DURATION = 3000 // milliseconds
const MAX_TOASTS = 3

let nextId = 1 // a simple counter gives every toast its own id

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message) => {
      const id = nextId++
      // Keep only the newest few, so the screen never fills up with messages.
      setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, message }])
      setTimeout(() => dismissToast(id), TOAST_DURATION)
    },
    [dismissToast],
  )

  // WHY useMemo: the value object stays the same between renders,
  // so components that only use showToast do not re-render for nothing.
  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext value={value}>
      {children}
      <ToastList toasts={toasts} onDismiss={dismissToast} />
    </ToastContext>
  )
}
