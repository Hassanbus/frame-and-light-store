import { CATEGORIES } from '../data/products.js'
import { SORT_OPTIONS } from '../utils/filters.js'
import Icon from './Icon.jsx'
import './ShopFilters.css'

// The filter bar of the shop.
// WHY no state here: it only SHOWS the values that come from the URL and reports
// every change to ShopPage. The URL is the single source of truth.
export default function ShopFilters({ filters, onChange }) {
  return (
    <form
      className="shop-filters"
      role="search"
      aria-label="Filter prints"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="field filter-search">
        <label htmlFor="filter-q">Search</label>
        <div className="input-with-icon">
          <Icon name="search" size={18} />
          <input
            id="filter-q"
            className="input"
            type="search"
            placeholder="Try “fog” or “stars”"
            value={filters.q}
            onChange={(event) => onChange('q', event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          className="input"
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-sort">Sort by</label>
        <select
          id="filter-sort"
          className="input"
          value={filters.sort}
          onChange={(event) => onChange('sort', event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="field filter-price">
        <legend>Price (A4 size)</legend>
        <div className="price-inputs">
          <label htmlFor="filter-min" className="visually-hidden">Minimum price in dollars</label>
          <input
            id="filter-min"
            className="input"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Min $"
            value={filters.min ?? ''}
            onChange={(event) => onChange('min', event.target.value)}
          />
          <label htmlFor="filter-max" className="visually-hidden">Maximum price in dollars</label>
          <input
            id="filter-max"
            className="input"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="Max $"
            value={filters.max ?? ''}
            onChange={(event) => onChange('max', event.target.value)}
          />
        </div>
      </fieldset>
    </form>
  )
}
