# Frame & Light — Project Plan

A front-end only demo store for photography prints. The brand is fictional.
There is no backend, no database, no payment, no API keys and no environment variables.
Every page shows that this is a demo: the footer on every page, and the checkout page.

## 1. Screens (routes)

| Route                 | Page               | What the user can do |
|-----------------------|--------------------|----------------------|
| `/`                   | HomePage           | See the hero, featured prints and the 6 categories |
| `/shop`               | ShopPage           | Search, filter by category, filter by price range, sort. All filters live in the URL (`?q=&category=&min=&max=&sort=`) so a link can be shared |
| `/product/:id`        | ProductPage        | Big image, choose size (A4 / A3 / A2), quantity, add to cart, add to wishlist, see related prints |
| `/cart`               | CartPage           | Change quantity, remove items, see subtotal, shipping and total |
| `/checkout`           | CheckoutPage       | Fill a validated form (name, email, phone, address, city). Only payment option: "Cash on delivery (demo)". No card fields |
| `/order-confirmation` | ConfirmationPage   | See the generated order number. The cart is cleared on submit |
| `/wishlist`           | WishlistPage       | See and remove saved prints |
| `*`                   | NotFoundPage       | Friendly 404 with links back |

Shared on every page: responsive navbar (mobile menu under 768 px), cart count badge,
light / dark mode toggle, toast messages, footer with the demo note.

Empty states: empty cart, empty wishlist, no search results, unknown product.

## 2. Business rules

- Size prices: A4 = base price, A3 = base + $15, A2 = base + $35 (whole dollars, so no rounding problems).
- Quantity per cart line: 1 to 10.
- Shipping: free when the subtotal is **over** $100, otherwise $8. An empty cart has no shipping.
- Order number: `FL-YYMMDD-1234` (date + 4 random digits). It is only for the demo.

## 3. State

| State     | Where                                   | Saved in localStorage |
|-----------|-----------------------------------------|-----------------------|
| Cart      | `useReducer(cartReducer)` + CartContext | `fl-cart` |
| Wishlist  | `useReducer(wishlistReducer)` + WishlistContext | `fl-wishlist` |
| Toasts    | `useState` inside ToastProvider         | no |
| Theme     | `useTheme` hook + `data-theme` on `<html>` | `fl-theme` |
| Filters   | URL query string (`useSearchParams`)    | no (the URL is the state) |

- A cart item stores only `{ key, productId, size, quantity }`. Prices are always calculated
  from `products.js`, so an old price in localStorage can never be shown.
- All localStorage access goes through `src/utils/storage.js`, which uses try/catch
  (private mode or a full disk must not crash the app).

## 4. Components

- Layout: `Layout`, `Navbar`, `MobileMenu` (inside Navbar), `Footer`, `SkipLink`, `ScrollToTop`
- UI: `ThemeToggle`, `CartBadge`, `ToastList`, `EmptyState`, `QuantityInput`, `PriceTag`
- Products: `ProductCard`, `ProductGrid`, `CategoryGrid`, `WishlistButton`, `SizePicker`
- Shop: `ShopFilters`, `SortSelect` (inside ShopFilters)
- Cart / checkout: `CartLine`, `OrderSummary`, `FormField`, `CheckoutForm`

## 5. Folder structure

```
frame-and-light-store/
├─ docs/                  PLAN.md, HOW_IT_WORKS.md
├─ public/
│  ├─ images/             24 large (1200x900) + 24 thumbnail (600x450) JPEGs
│  ├─ favicon.svg
│  └─ og-image.png        1200x630 screenshot of the home page
├─ scripts/
│  └─ download-images.js  one-time image download + JPEG check
├─ src/
│  ├─ main.jsx            entry: providers + router
│  ├─ App.jsx             the list of routes
│  ├─ data/products.js    24 products, categories, sizes
│  ├─ utils/              price.js, storage.js, filters.js, order.js, validation.js (+ tests)
│  ├─ context/            cart, wishlist and toast context + providers + reducers (+ tests)
│  ├─ hooks/              useTheme.js, useDocumentTitle.js
│  ├─ components/         small reusable pieces, each with its own CSS file when needed
│  ├─ pages/              one file per screen
│  └─ styles/             tokens.css (CSS variables), base.css, utilities
├─ index.html             title, description and Open Graph tags
├─ vercel.json            rewrite every route to /index.html
└─ README.md
```

## 6. Design

- Plain CSS with CSS variables: colors, spacing scale, type scale, radius, shadow.
- One accent color (terracotta). Neutral warm greys. Lots of white space.
- Dark mode: the same variables get new values under `[data-theme='dark']`.
- System fonts only (no web fonts), so nothing is loaded from the internet at runtime.
- Breakpoints checked at 360, 768 and 1280 px.

## 7. Accessibility checklist

Labels on every input, alt text on every image, visible `:focus-visible` outline,
skip link, everything works with the keyboard, `aria-live` region for toasts,
`aria-invalid` + `aria-describedby` for form errors, color contrast checked (WCAG AA).

## 8. Build order (one git commit per step; lint + tests + build before each commit)

1. Scaffold React + Vite, add this plan, add Vitest and React Router
2. Product data, downloaded images, price helpers + tests
3. App shell: routes, layout, navbar + mobile menu, footer, theme, toasts, 404
4. Cart and wishlist state (reducers, context, localStorage) + reducer tests
5. Home page
6. Shop page with URL filters + filter tests
7. Product details page
8. Cart page
9. Checkout + confirmation (+ validation tests)
10. Wishlist page
11. Meta tags, Open Graph image, vercel.json
12. README and docs/HOW_IT_WORKS.md

## 9. What changed while building

The plan above was written before coding. A few things changed, on purpose:

- Component names: `CartBadge` became `CartLink`, the skip link and mobile menu live inside
  `Layout` and `Navbar`, and `SortSelect` is part of `ShopFilters`. `PriceTag` was not needed.
- New small components: `BuyBox`, `CartLine`, `OrderSummary`, `ProductImage`, `Hero`, `Icon`.
- Styles are split into `tokens.css`, `base.css`, `layout.css`, `buttons.css` and `forms.css`.
- `BrowserRouter` uses `useTransitions={false}`: a browser test showed that quick filter changes
  could use old URL values when React Router updates run as transitions.
- `scroll-padding-top` was added so the sticky header never covers a focused form field.

## 10. Publish

GitHub repo `frame-and-light-store` (public) with `gh`, then deploy to Vercel with
`npx vercel --prod --yes`, then check `/`, `/shop` and `/cart` return HTTP 200.
