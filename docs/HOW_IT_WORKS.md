# How Frame & Light works

This document explains every file in simple English. For each file you get:

- **What** it does
- **Why** it is built this way
- **How** it works

Then you find the order to rebuild the project from zero, and 15 interview questions with short answers.

---

## 1. The big picture

- There is **no server**. The browser downloads one HTML page, one JavaScript file and one CSS file.
  React draws every page in the browser. This is called a **single-page app (SPA)**.
- **React Router** decides which page to show for each URL (`/shop`, `/cart` ...).
- The **products** are a JavaScript file (`src/data/products.js`). The **photos** are local files
  in `public/images/`.
- The **cart** and the **wishlist** live in React state (`useReducer` + Context) and are saved
  in **localStorage**, so they are still there after a refresh.
- The **shop filters** live in the **URL** (`/shop?category=Night&sort=price-asc`).
- All **rules** (prices, shipping, filters, form checks, cart changes) are **pure functions**.
  Pure means: the same input always gives the same output, and nothing else changes.
  That is why they are easy to test with Vitest.

---

## 2. Every file

### Project root

#### `package.json`
- **What:** The project's ID card: name, scripts and the list of libraries.
- **Why:** npm reads it to install the right libraries and to run commands like `npm test`.
- **How:** `dependencies` are needed in the browser (react, react-dom, react-router).
  `devDependencies` are only for building and checking (vite, vitest, eslint ...).
  `"type": "module"` lets Node use `import` / `export`. The `scripts` are: `dev`, `build`,
  `lint`, `test`, `test:watch`, `preview` and `images`.

#### `package-lock.json`
- **What:** The exact version of every installed library (also the libraries of the libraries).
- **Why:** Everybody (and Vercel) installs exactly the same versions, so "it works on my computer" also works there.
- **How:** npm writes it. We never edit it by hand.

#### `index.html`
- **What:** The only HTML page. React puts the whole app into `<div id="root">`.
- **Why:** The `<head>` holds things that must exist before JavaScript runs: the title, the
  description, the Open Graph tags (the preview card when the link is shared) and the favicon.
- **How:** A tiny inline script reads the saved theme (or the system theme) and sets
  `<html data-theme="dark">` **before** React starts. Without it, dark mode users would see a white
  flash. Then `<script type="module" src="/src/main.jsx">` starts the app.

#### `vite.config.js`
- **What:** The settings for Vite, the tool that runs the dev server and builds the site.
- **Why:** Vite needs the React plugin to understand JSX and to do fast refresh while coding.
- **How:** It only adds `react()` to the plugins. Everything else uses Vite's defaults.

#### `eslint.config.js`
- **What:** The rules for ESLint, the tool behind `npm run lint`.
- **Why:** It finds mistakes early, for example a hook called inside an `if`, or an unused variable.
- **How:** It is the config from the Vite template (JavaScript rules, React Hooks rules, React
  Refresh rules) plus one extra block: files in `scripts/` run in Node, so they get Node globals.

#### `vercel.json`
- **What:** One rule for Vercel: send every URL to `/index.html`.
- **Why:** On a refresh of `/shop`, Vercel looks for a file called `shop`. It does not exist, so
  without this rule you would get a 404 error. With the rule, Vercel sends `index.html`, React starts
  and React Router shows the shop. Real files (photos, CSS, JS) are still served normally.
- **How:** `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`.

#### `.gitignore` and `.gitattributes`
- **What:** `.gitignore` lists files that git must not save (`node_modules`, `dist`, logs).
  `.gitattributes` keeps line endings the same (LF) on every computer.
- **Why:** `node_modules` and `dist` can be made again with `npm install` and `npm run build`, and
  they are very big. Same line endings keep git diffs clean between Windows and Mac/Linux.
- **How:** Simple text patterns that git reads.

#### `README.md`
- **What:** The front page of the project on GitHub.
- **Why:** A visitor should understand the project in one minute: what it is, how to run it and what I learned.
- **How:** Plain Markdown with a screenshot (`public/og-image.png`).

#### `docs/PLAN.md` and `docs/HOW_IT_WORKS.md`
- **What:** The plan written **before** coding, and this explanation written **after** coding.
- **Why:** Planning first (screens, state, folders) makes the code simpler. This file helps me
  explain every decision.

### `scripts/`

#### `scripts/download-images.js`
- **What:** A one-time Node script (`npm run images`) that downloads all product photos into `public/images/`.
- **Why:** The site must not load photos from the internet while people use it. So we download
  them **once** and keep them as normal files.
- **How:** For every product and for two sizes (1200×900 and 600×450) it fetches
  `https://picsum.photos/seed/<imageSeed>/<width>/<height>`. It checks that the bytes are a complete
  JPEG (starts with `FF D8 FF`, ends with `FF D9`) before saving. Files that already exist and are
  valid are **skipped**, so running it twice downloads nothing new.

### `public/`

#### `public/images/*.jpg`
- **What:** 48 photos: each of the 24 prints in 1200px and 600px width (for example `fl-37-1200.jpg`).
- **Why:** Two sizes let phones download the small file and big screens the sharp one.
- **How:** Vite copies `public/` into the build as it is, so `/images/fl-37-600.jpg` works.

#### `public/favicon.svg`
- **What:** The small icon in the browser tab: a frame with a point of light, in the accent color.
- **Why:** The Vite logo from the template does not belong to this brand.

#### `public/og-image.png`
- **What:** A 1200×630 screenshot of the home page, made with Playwright.
- **Why:** Chat apps and social sites show it when someone shares the link (`og:image` in `index.html`).

### `src/` – the start

#### `src/main.jsx`
- **What:** The starting point of the React app.
- **Why:** Everything that the **whole** app needs is set up here, once.
- **How:**
  1. It imports the global CSS **first**. CSS that loads later wins when two rules are equally
     strong, and component CSS must be able to override the shared styles.
  2. It renders `<BrowserRouter useTransitions={false}>`. By default React Router 8 updates the URL
     state as a low-priority "transition". A browser test showed that two quick filter changes could
     then use old values, so we use normal, immediate updates (this app loads no data, so we lose nothing).
  3. Inside: `ScrollToTop`, then the providers `ToastProvider` → `CartProvider` → `WishlistProvider`,
     then `<App />`. Every page below a provider can use its state.

#### `src/App.jsx`
- **What:** The map of the website: which URL shows which page.
- **Why:** All routes in one place are easy to read and to change.
- **How:** A parent `<Route element={<Layout />}>` wraps all pages, so they share the navbar and
  footer. `index` is the home page. `product/:id` has a URL parameter. `*` catches every unknown URL
  and shows the 404 page.

### `src/data/`

#### `src/data/products.js`
- **What:** The 24 products, plus `CATEGORIES`, `FEATURED_IDS`, `CATEGORY_COVERS` and `HERO_ID`.
- **Why:** With no backend, this file is our small database. Plain data is easy to read and to test.
- **How:** Each product has `id`, `title`, `category`, `basePrice` (the A4 price in whole dollars),
  `createdAt` (for "newest first"), `imageSeed` (the photo file name) and `description`.
  The first sentence of each description says what is in the photo; we use it as alt text.

#### `src/data/sizes.js`
- **What:** The three sizes A4, A3 and A2 with their dimensions and the `extra` price.
- **Why:** Sizes are the same for every print, so they live in one list.
- **How:** A4 adds $0, A3 adds $15, A2 adds $35. Whole dollars mean no rounding problems.

### `src/utils/` – pure helper functions (each one has a `.test.js` file next to it)

#### `src/utils/storage.js` (+ `storage.test.js`)
- **What:** `loadState(key, fallback)` and `saveState(key, value)` around localStorage.
- **Why:** localStorage can throw an error (private mode, full disk) and saved text can be broken.
  The app must never crash because of that.
- **How:** Both use `try/catch`. Loading uses `JSON.parse` and returns the fallback on any problem.
  Saving returns `false` if it fails. The test replaces localStorage with a small fake object.

#### `src/utils/price.js` (+ `price.test.js`)
- **What:** All money rules: unit price, line total, subtotal, shipping, total and `formatPrice`.
- **Why:** Product page, cart, checkout and tests must use **the same** rules.
- **How:** `getUnitPrice(base, size)` adds the size extra. `getShipping(subtotal)` returns $0 for an
  empty cart, $0 when the subtotal is **over** $100, otherwise $8 (so exactly $100 still pays $8).
  `formatPrice` uses `Intl.NumberFormat` to show `$1,234.50`.

#### `src/utils/catalog.js` (+ `catalog.test.js`)
- **What:** `getProductById`, `getRelatedProducts`, `getImageSrc` and `getAltText`.
- **Why:** Many components need to find products or image paths. One helper avoids copying code.
- **How:** Related prints = same category first, then other prints, cut to 4. The `all` parameter
  lets tests pass a small fake list. Image paths look like `/images/fl-37-600.jpg`.

#### `src/utils/filters.js` (+ `filters.test.js`)
- **What:** `readFilters(searchParams)` and `filterProducts(products, filters)` for the shop.
- **Why:** Anyone can type any URL, so values must be checked. And filter logic is easier to test
  outside of React.
- **How:** `readFilters` turns the URL into `{ q, category, min, max, sort }`. Unknown categories or
  sorts and bad prices fall back to safe defaults. `filterProducts` searches title, category and
  description (case does not matter), checks the category and price range, then sorts.
  `filter()` already makes a new array, so `sort()` does not change the original list.

#### `src/utils/validation.js` (+ `validation.test.js`)
- **What:** `validateCheckout(values)` returns one message per wrong field, or `{}` when all is fine.
- **Why:** A plain function can be tested without a browser, and the form only has to show the result.
- **How:** It trims every value, then checks: name (2+ characters), email (`something@domain.xx`),
  phone (only digits, `+`, spaces, dashes, brackets, dots and 7 to 15 digits), address (5+ characters)
  and city (2+ characters).

#### `src/utils/order.js` (+ `order.test.js`)
- **What:** `createOrderNumber()` makes numbers like `FL-261108-0427`.
- **Why:** The confirmation page needs an order number, even in a demo.
- **How:** "FL" + date as YYMMDD + 4 random digits. The date and the random function are parameters
  with default values, so the test can pass fixed ones and always get the same result.

### `src/context/` – shared state

#### `src/context/cartReducer.js` (+ `cartReducer.test.js`)
- **What:** The **only** place where the cart can change. Actions: `add`, `setQuantity`, `remove`, `clear`.
- **Why:** All cart rules live in one pure function, which is easy to read and to test.
- **How:** A cart line is `{ key, productId, size, quantity }` and the key is `"dune-line|A3"`.
  Adding the same print in the same size raises the quantity instead of adding a new line.
  `clampQuantity` keeps every quantity between 1 and 10. The reducer always returns a **new** array
  (React needs that to see the change) and throws an error for unknown actions.
  `restoreCart(saved)` cleans data from localStorage: it drops unknown products and sizes, and adds
  the valid lines again with the reducer itself, so the same rules apply.

#### `src/context/cartContext.js`
- **What:** `CartContext` and the `useCart()` hook.
- **Why:** Context lets the navbar badge, the product page and the cart page share one cart without
  passing props through many layers. The hook throws a clear error if used outside the provider.
- **How:** `createContext(null)` + `useContext`. It is a separate file because React Fast Refresh
  works best when a file exports only components or only non-components.

#### `src/context/CartProvider.jsx`
- **What:** The component that owns the cart state and gives it to the app.
- **Why:** State + saving + derived values (lines, count, subtotal) in one place.
- **How:** `useReducer(cartReducer, null, loadCart)` reads localStorage only once (lazy init).
  `useEffect` saves the cart after every change. `useMemo` builds the value: `lines` (each item joined
  with its product), `count`, `subtotal` and the functions `addItem`, `setQuantity`, `removeItem`,
  `clearCart`. Prices are never stored, so an old price can never appear.

#### `src/context/wishlistReducer.js` (+ `wishlistReducer.test.js`), `wishlistContext.js`, `WishlistProvider.jsx`
- **What:** The same pattern as the cart, for a list of product ids.
- **Why:** One pattern for both makes the code predictable.
- **How:** `toggle` adds or removes an id, `remove` removes it. `restoreWishlist` keeps only real
  product ids, once each. The provider gives `ids`, `isInWishlist`, `toggleWishlist` and `removeFromWishlist`.

#### `src/context/toastContext.js` and `src/context/ToastProvider.jsx`
- **What:** `useToast()` gives every component `showToast(message)`.
- **Why:** Short messages like "Added to cart" give feedback without opening a dialog.
- **How:** The provider keeps a list of toasts in `useState`. Each toast gets an id from a counter
  and is removed after 3 seconds with `setTimeout`. Only the newest 3 are kept. `useCallback` and
  `useMemo` keep `showToast` the same between renders. The provider also renders `<ToastList>`.

### `src/hooks/`

#### `src/hooks/useTheme.js`
- **What:** Returns `{ theme, toggleTheme }` for light and dark mode.
- **Why:** The theme logic stays out of the button component.
- **How:** It starts with the value that the script in `index.html` already put on `<html>`. A
  `useEffect` keeps `data-theme` in sync. `toggleTheme` saves the choice in localStorage only when the
  user really clicks, so a visitor who never clicks keeps following the system setting.

#### `src/hooks/useDocumentTitle.js`
- **What:** Sets the browser tab text, for example "Cart | Frame & Light".
- **Why:** It helps people with many tabs, and screen readers announce the title.
- **How:** A `useEffect` that sets `document.title` when the title changes.

### `src/styles/` – global CSS

#### `src/styles/tokens.css`
- **What:** All design tokens as CSS variables: colors, font sizes, spacing, radius, shadows.
- **Why:** Change one value and the whole site follows. Dark mode only gives the same variables new values.
- **How:** `:root { --color-accent: #a9431e; ... }` and `[data-theme='dark'] { ... }`.
  Every text color pair was measured against WCAG AA (4.5:1 or more).

#### `src/styles/base.css`
- **What:** A small reset and the default look of HTML elements (body, headings, links, images, focus ring).
- **Why:** Same start on every browser, and a clear `:focus-visible` ring for keyboard users.
- **How:** It also sets `scroll-padding-top` on `<html>`, so the sticky header never covers a focused
  field, and turns off animations for people who ask for reduced motion.

#### `src/styles/layout.css`
- **What:** Shared helpers: `.container`, `.page`, `.section`, `.eyebrow`, `.muted`, `.visually-hidden`, `.demo-banner`.
- **Why:** Many pages need the same spacing and the same "hidden but readable" text.
- **How:** `.visually-hidden` hides text on screen but screen readers still read it.

#### `src/styles/buttons.css`
- **What:** `.button`, `.button-secondary`, `.button-block`, `.icon-button`, `.link-button`.
- **How:** Hover colors and the 150ms transition come from the tokens in `tokens.css`.
- **Why:** One look for all buttons. Buttons are at least 44px high, which is good for fingers.

#### `src/styles/forms.css`
- **What:** `.field`, `.input`, `.field-error`, `.field-hint` and resets for `fieldset` / `legend`.
- **Why:** The shop filters and the checkout use the same form styles.
- **How:** `.input[aria-invalid='true']` gets a red, thicker border. The message text says what is wrong
  (color is never the only signal).

### `src/components/` – reusable parts (CSS files sit next to their component)

#### `Layout.jsx` + `Layout.css`
- **What:** The frame of every page: skip link, navbar, `<main>`, footer.
- **Why:** Written once, used by all routes.
- **How:** `<Outlet />` is where React Router puts the current page. The skip link jumps to
  `<main id="main" tabIndex={-1}>`; the CSS hides it off screen until it gets keyboard focus.

#### `Navbar.jsx` + `Navbar.css`
- **What:** Logo, links (Home, Shop, Wishlist), theme button, cart link and the mobile menu.
- **Why:** Phones need a menu button; bigger screens show the links in one row.
- **How:** `menuOpen` state opens the panel. The button has `aria-expanded` and `aria-controls`.
  The menu closes when you click a link or press Escape. `NavLink` adds `aria-current="page"`
  to the current link (styled with an underline). The CSS is mobile first; from 768px the button is hidden.

#### `CartLink.jsx` + `CartLink.css`
- **What:** The bag icon with the cart count badge.
- **How:** It reads `count` from `useCart()`. The link label says "Cart, 3 items" for screen readers;
  the visible badge is `aria-hidden` so the number is not read twice.

#### `ThemeToggle.jsx`
- **What:** The sun / moon button.
- **How:** It uses `useTheme()`. The label says what will happen ("Switch to dark mode").

#### `Footer.jsx` + `Footer.css`
- **What:** The footer with **"Demo project, not a real store."**, the photo credits and the copyright.
- **How:** `margin-top: auto` keeps it at the bottom on short pages.

#### `ScrollToTop.jsx`
- **What:** Scrolls to the top when the page (pathname) changes.
- **Why:** A single-page app keeps the old scroll position otherwise. It watches only the pathname,
  so changing a shop filter does not jump.

#### `ToastList.jsx` + `ToastList.css`
- **What:** Shows the toast messages in a corner of the screen.
- **How:** The box has `role="status"` and `aria-live="polite"` and is always in the page, so screen
  readers read new messages. Each toast has a close button.

#### `EmptyState.jsx` + `EmptyState.css`
- **What:** A friendly box for "nothing here": empty cart, empty wishlist, no results, 404.
- **How:** Props: `icon`, `title`, `text`, `actions` and `headingLevel` (h1 on pages that have no other title).

#### `Icon.jsx`
- **What:** Small inline SVG icons (bag, heart, sun, moon, menu, close, search, plus, minus, arrow, check).
- **Why:** No icon library and no extra downloads.
- **How:** The shapes use `currentColor`, so icons take the text color (also in dark mode). They are
  `aria-hidden`, because the button or link around them has the label.

#### `ProductImage.jsx`
- **What:** One photo in two sizes.
- **Why:** Fast and stable pages.
- **How:** `srcSet` lists the 600px and 1200px files and `sizes` tells the browser how wide the
  image is shown, so it picks the right file. `width`/`height` reserve the space (no jumping).
  Photos below the fold use `loading="lazy"`; the hero and product photo use `eager`.

#### `ProductCard.jsx` + `ProductCard.css`
- **What:** One print in a grid: photo, title, category, "From $28.00" and the heart button.
- **Why:** Only the title is a real link (clean for screen readers), but the whole card should be clickable.
- **How:** "Stretched link": the link's `::after` covers the whole card. The heart button sits above it
  (`z-index: 2`), so it gets its own clicks. The keyboard focus ring is drawn around the whole card.

#### `ProductGrid.jsx` + `ProductGrid.css`
- **What:** A responsive list of cards: 2 columns on phones, 3 on tablets, 4 on desktops.
- **How:** A list of exactly 4 prints keeps 2 columns on tablets (2 + 2 looks better than 3 + 1).

#### `WishlistButton.jsx` + `WishlistButton.css`
- **What:** The heart, as a round icon (cards) or a button with text (product page).
- **How:** The label always says what will happen: "Add to wishlist" or "Remove from wishlist".
  It shows a toast after the click. A filled heart shows a saved print.

#### `CategoryGrid.jsx` + `CategoryGrid.css`
- **What:** The 6 category cards on the home page.
- **How:** Each card links to `/shop?category=Night` etc. The cover photo is decoration (`alt=""`)
  because the link text already names the category. A dark gradient keeps white text readable.

#### `Hero.jsx` + `Hero.css`
- **What:** The big welcome block: headline, text, two buttons and a framed photo.
- **How:** The white border and shadow make the photo look like a framed print ("Frame & Light").

#### `ShopFilters.jsx` + `ShopFilters.css`
- **What:** Search, category, sort and price inputs.
- **Why:** It has **no state of its own**: it shows the values from the URL and reports changes.
  So the URL stays the single source of truth.
- **How:** Each input has a label (the price inputs have hidden labels and a visible legend).
  The CSS goes from stacked on phones to one row on desktops.

#### `SizePicker.jsx` + `SizePicker.css`
- **What:** A4 / A3 / A2 as cards with dimensions and price.
- **Why:** Real radio inputs give keyboard support (arrow keys) and screen reader support for free.
- **How:** The radio is invisible but still there. `:has(input:checked)` styles the chosen card with
  a thicker border and a tinted background (not only a color change).

#### `QuantityInput.jsx` + `QuantityInput.css`
- **What:** A "− 2 +" control.
- **Why:** With only buttons, the value can never be empty, negative or bigger than 10.
- **How:** At the limits the buttons get `aria-disabled` (not `disabled`, which would drop keyboard
  focus) and ignore clicks. The number is in an `<output aria-live="polite">`, so changes are read aloud.

#### `BuyBox.jsx` + `BuyBox.css`
- **What:** Price, size picker, quantity, "Add to cart · $86.00" and the wishlist button.
- **How:** `size` and `quantity` are local state. "Add to cart" calls `addItem` and shows a toast.

#### `CartLine.jsx` + `CartLine.css`
- **What:** One cart row: photo, title, size, price each, quantity, line total and Remove.
- **How:** The photo link has `tabIndex={-1}` and `aria-hidden`, because the title is the same link.
  The Remove button has hidden extra text ("Remove Dune Line, size A3") so screen reader users know
  which row it belongs to.

#### `OrderSummary.jsx` + `OrderSummary.css`
- **What:** Subtotal, shipping ("Free" or $8.00), total and a shipping note.
- **Why:** The cart and the checkout show the same numbers, so one component does both.
- **How:** The checkout passes `lines` to list the prints again. `children` adds extra buttons.
  On wide screens the box is `position: sticky`.

#### `FormField.jsx`
- **What:** One label + input + error message.
- **How:** When there is an error, the input gets `aria-invalid="true"` and `aria-describedby`
  points to the message, so screen readers read both.

#### `CheckoutForm.jsx` + `CheckoutForm.css`
- **What:** The delivery form and the payment choice.
- **Why:** `noValidate` turns off the browser's own pop-ups, so we show one clear style of message.
- **How:** `values` and `errors` are state. On submit it validates everything; if something is wrong it
  moves focus to the **first wrong field**. While typing, a field that shows an error is checked again,
  so the message disappears when fixed. Leaving a filled field checks it too. The only payment option
  is "Cash on delivery (demo)" – there are no card fields.

### `src/pages/` – one file per screen

#### `HomePage.jsx` + `HomePage.css`
- **What:** Hero, featured prints, categories and three short promises (shipping, sizes, cash on delivery).

#### `ShopPage.jsx` + `ShopPage.css`
- **What:** The shop with filters and results.
- **Why:** Filters in the URL can be shared, bookmarked, and survive a refresh.
- **How:** `useSearchParams()` gives the URL params. On every render we call `readFilters` and
  `filterProducts` (24 products are fast enough, no `useState` needed). `updateFilter` copies the
  params, changes one, removes empty or default values and calls `setSearchParams(next, { replace: true })`
  (replace: typing "fog" must not add three entries to the Back button). The result count is a
  heading with `aria-live`, so screen readers hear the new number. "Clear filters" keeps the sort.

#### `ProductPage.jsx` + `ProductPage.css`
- **What:** The product details page with breadcrumb, framed photo, buy box and related prints.
- **How:** `useParams()` reads the `:id`. Unknown ids show "Print not found". `<BuyBox key={product.id}>`
  makes React start a fresh buy box (A4, quantity 1) when you open another print.

#### `CartPage.jsx` + `CartPage.css`
- **What:** The cart with its lines and the order summary, or the empty state.
- **How:** After Remove, focus moves to the page title (the button is gone, so focus would be lost).

#### `CheckoutPage.jsx` + `CheckoutPage.css`
- **What:** The demo notice, the checkout form and the order summary.
- **How:** On a valid submit it builds the order (number, name, email, count, total), calls `clearCart()`
  and `navigate('/order-confirmation', { replace: true, state: { order } })`. `replace` means Back does
  not return to an empty checkout. `state` carries the order to the next page without a server.

#### `ConfirmationPage.jsx` + `ConfirmationPage.css`
- **What:** "Thank you, Sam!" with the order number, total and the demo notice.
- **How:** It reads the order from `useLocation().state`. Focus moves to the heading. If someone opens
  the URL directly (no order in state), it shows "No order to show".

#### `WishlistPage.jsx`
- **What:** The saved prints, or the empty state.
- **How:** It turns the saved ids back into products. A hidden `<h2>` keeps the heading order h1 > h2 > h3.

#### `NotFoundPage.jsx`
- **What:** The 404 page for every unknown URL, with links to the shop and the home page.

---

## 3. Rebuild it from zero (in this order)

1. `npm create vite@latest frame-and-light-store -- --template react --eslint`, then `npm install`,
   `npm install react-router` and `npm install -D vitest`. Add `"test": "vitest run"`.
2. Write `docs/PLAN.md`: screens, routes, state, components, folders.
3. `src/utils/storage.js` + test (safe localStorage).
4. `src/data/products.js`, `src/data/sizes.js`, `src/utils/price.js` + test.
5. `scripts/download-images.js`, run `npm run images`, check the JPEG files.
6. `src/styles/tokens.css`, `base.css`, `layout.css`, `buttons.css` (check the color contrast).
7. App shell: `main.jsx`, `App.jsx`, `Layout`, `Navbar`, `Footer`, `ThemeToggle` + `useTheme`,
   the theme script in `index.html`, toasts, `EmptyState`, `NotFoundPage`.
8. State: `cartReducer` + test, `cartContext`, `CartProvider`, the wishlist files, `CartLink` badge.
9. Product parts: `ProductImage`, `ProductCard`, `ProductGrid`, `WishlistButton`, `Icon`.
10. Home page: `Hero`, `CategoryGrid`, `HomePage`.
11. Shop: `filters.js` + test, `forms.css`, `ShopFilters`, `ShopPage`.
12. Product page: `SizePicker`, `QuantityInput`, `BuyBox`, `ProductPage`.
13. Cart: `CartLine`, `OrderSummary`, `CartPage`.
14. Checkout: `validation.js` + test, `order.js` + test, `FormField`, `CheckoutForm`, `CheckoutPage`, `ConfirmationPage`.
15. `WishlistPage`.
16. Test in a browser at 360, 768 and 1280 px, with the keyboard and in dark mode.
17. Meta tags in `index.html`, `public/og-image.png`, `vercel.json`.
18. README, then publish to GitHub and deploy to Vercel.

After every step: `npm run lint`, `npm test`, `npm run build`, then one git commit.

---

## 4. Interview questions

1. **Why `useReducer` for the cart and not `useState`?**
   The cart has several actions with rules (merge the same print, limit 1–10, remove, clear).
   A reducer keeps all of them in one pure function that I can test without React.

2. **Why Context and not props or Redux?**
   Many distant components need the cart (navbar badge, product page, cart, checkout). Context avoids
   passing props through many layers. The app is small, so a state library would be extra weight.

3. **How is the cart saved, and what if localStorage fails?**
   A `useEffect` saves it after every change through `saveState`. Both load and save use `try/catch`,
   so private mode, a full disk or broken JSON only means "start with an empty cart".

4. **Why does the cart store ids and not prices?**
   Prices come from `products.js` every time. If a price changes, an old saved price can never be shown,
   and the saved data stays small.

5. **Why are the shop filters in the URL?**
   A link like `/shop?category=Night&sort=price-asc` can be shared or bookmarked, refresh keeps the
   filters, and the URL is the single source of truth (no duplicate state).

6. **What does `useTransitions={false}` do?**
   React Router 8 normally updates the URL state inside `startTransition` (low priority). With inputs
   whose values live in the URL, a second quick change could still see the old URL and undo the first
   change. A browser test showed this. Normal updates fix it; the app loads no data, so nothing is lost.

7. **Why does Vercel need `vercel.json`?**
   It is a single-page app: only `index.html` exists. A refresh on `/shop` would ask for a file that does
   not exist. The rewrite sends every route to `index.html`, and React Router shows the right page.

8. **How do you make the images fast?**
   Local files in two widths, `srcset` + `sizes` so the browser picks the right one, `width`/`height` to
   avoid layout jumps, and `loading="lazy"` for photos lower on the page.

9. **How is the checkout form accessible?**
   Every input has a `<label>`. Errors are text (not only red), linked with `aria-describedby`, the input
   gets `aria-invalid`, and on submit the focus moves to the first wrong field.

10. **Why `key={product.id}` on the buy box?**
    When you go from one product to a related product, React keeps the same component and its state.
    A new key tells React "this is a new thing", so size and quantity reset.

11. **How does dark mode work without a white flash?**
    A tiny script in `index.html` sets `data-theme` before React loads. The CSS variables change values
    under `[data-theme='dark']`. The choice is saved only when the user clicks the toggle.

12. **What did you test, and why those parts?**
    The pure functions: cart and wishlist reducers, prices and shipping, filters, validation, order
    numbers and storage. They hold the rules, and pure functions are quick and reliable to test.
    I also checked the pages in a real browser with Playwright scripts.

13. **How do you avoid problems with money and decimals?**
    All prices are whole dollars, so adding them never creates errors like 0.1 + 0.2. `Intl.NumberFormat`
    only formats the number for display.

14. **How can the whole product card be clickable but still accessible?**
    Only the title is a link. CSS stretches the link over the card with `::after`. Screen readers hear one
    clear link name, and the heart button sits above the overlay with a higher `z-index`.

15. **What would a real store need?**
    A backend and database for products, stock and orders, a real payment provider, user accounts,
    server-side validation, order emails, and privacy and legal pages.
