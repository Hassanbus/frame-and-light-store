import Icon from './Icon.jsx'
import './EmptyState.css'

// A friendly message for "nothing here" moments: empty cart, no results, 404 ...
// "actions" is any JSX, for example a link back to the shop.
export default function EmptyState({ icon, title, text, actions, headingLevel = 2 }) {
  // WHY: the 404 page needs an <h1>, the other pages already have one, so they use <h2>.
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <div className="empty-state">
      {icon && (
        <div className="empty-state-icon">
          <Icon name={icon} size={32} />
        </div>
      )}
      <Heading className="empty-state-title">{title}</Heading>
      {text && <p className="muted">{text}</p>}
      {actions && <div className="empty-state-actions">{actions}</div>}
    </div>
  )
}
