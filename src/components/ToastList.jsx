import Icon from './Icon.jsx'
import './ToastList.css'

// Shows the toast messages in the corner of the screen.
// WHY role="status": screen readers read new messages aloud without moving focus.
// The box is always in the page (even when empty), so new messages are announced.
export default function ToastList({ toasts, onDismiss }) {
  return (
    <div className="toast-list" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span>{toast.message}</span>
          <button
            type="button"
            className="icon-button toast-close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss message"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}
