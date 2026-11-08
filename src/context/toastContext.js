import { createContext, useContext } from 'react'

// The "channel" that lets any component show a toast message.
export const ToastContext = createContext(null)

// Usage in a component: const { showToast } = useToast()
export function useToast() {
  const context = useContext(ToastContext)
  // WHY throw: a clear error is easier to fix than a silent "undefined".
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
