import { useSearchParams } from 'react-router'
import EmptyState from '../components/EmptyState.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ShopFilters from '../components/ShopFilters.jsx'
import { products } from '../data/products.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { DEFAULT_SORT, filterProducts, readFilters } from '../utils/filters.js'
import './ShopPage.css'

export default function ShopPage() {
  useDocumentTitle('Shop')
  const [searchParams, setSearchParams] = useSearchParams()

  // WHY no useState for filters: the URL already holds them. We read them on every render.
  const filters = readFilters(searchParams)
  const results = filterProducts(products, filters)
  const hasFilters = filters.q !== '' || filters.category !== '' || filters.min !== null || filters.max !== null

  // Change ONE filter in the URL and keep all the others.
  function updateFilter(name, value) {
    const next = new URLSearchParams(searchParams)
    // Empty and default values are removed, so the URL stays short and clean.
    if (value === '' || (name === 'sort' && value === DEFAULT_SORT)) next.delete(name)
    else next.set(name, value)
    // WHY replace: typing "fog" should not add three steps to the Back button.
    setSearchParams(next, { replace: true })
  }

  // "Clear" removes the filters but keeps the sort order the user picked.
  function clearFilters() {
    const next = new URLSearchParams()
    if (searchParams.get('sort')) next.set('sort', searchParams.get('sort'))
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Shop prints</h1>
        <p className="muted">
          Search, filter and sort all {products.length} prints. The link keeps your filters, so you
          can share it.
        </p>
      </header>

      <ShopFilters filters={filters} onChange={updateFilter} />

      <section aria-labelledby="results-title">
        <div className="results-bar">
          {/* aria-live: screen readers hear the new number of results after each change. */}
          <h2 id="results-title" className="results-count" aria-live="polite">
            {results.length === 1 ? '1 print' : `${results.length} prints`}
            {filters.category && ` in ${filters.category}`}
          </h2>
          {hasFilters && (
            <button type="button" className="link-button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <EmptyState
            icon="search"
            title="No prints found"
            text="Try another word, another category or a wider price range."
            actions={
              <button type="button" className="button" onClick={clearFilters}>
                Clear filters
              </button>
            }
          />
        )}
      </section>
    </div>
  )
}
