# ShopZone — AI-Assisted Development & Prompt Engineering Log

## 📌 1. Routing Setup
* **Prompt:**
  > *"Explain how to set up client-side routing in a React app using React Router DOM with standard routing configurations."*
* **How it was applied to ShopZone:**
  Implemented in `src/App.jsx` and `src/main.jsx` to establish single-page navigation layouts. We separated the layout container so that the persistent `Navbar` remains mounted globally, preventing unneeded page renders.

---

## 📌 2. Context API
* **Prompt:**
  > *"Show a simple example of using Context API to manage a global shopping cart without prop drilling."*
* **How it was applied to ShopZone:**
  Applied in `src/context/CartContext.jsx` and `src/context/AuthContext.jsx`. The application utilizes global Context Providers wrapped around the root component to allow any child page (like `Shop.jsx`, `Cart.jsx`, or `Navbar.jsx`) to directly trigger cart items and check user authentication without manually passing props.

---

## 📌 3. Debugging
* **Prompt:**
  > *"Help me identify why my component is re-rendering unexpectedly and suggest the possible fix."*
* **How it was applied to ShopZone:**
  Used to optimize our dynamic API data loaders. We resolved issues with unmounted components throwing memory leaks by adding clean reference locks (`isMounted`) inside `useEffect` async fetches, preventing background re-renders.

---

## 📌 4. Performance Improvement
* **Prompt:**
  > *"Suggest simple ways to improve the performance and code readability of my React project."*
* **How it was applied to ShopZone:**
  * Enabled lazy-loading (`loading="lazy"`) on catalog images inside the `ProductCard` component.
  * Synced caching operations (caching to `localStorage` and `sessionStorage`) out of the main render loop within state effects.
  * Combined related action dispatches using a clean `useReducer` action schema instead of separate state variables.

---

## 📌 5. UI Enhancement
* **Prompt:**
  > *"Recommend a clean and professional UI layout for an e-commerce website with Light and Dark mode support."*
* **How it was applied to ShopZone:**
  Implemented using custom CSS variables (like `--bg-main` and `--text-primary`) inside `src/index.css` paired with the `@media (prefers-color-scheme: dark)` system listener. Added glassmorphic visual cards and fluid, responsive grids.

---

## 📌 6. Code Refactoring
* **Prompt:**
  > *"Review my component structure and suggest simple refactoring ideas to improve maintainability without changing functionality."*
* **How it was applied to ShopZone:**
  We cleanly separated routing pages (`src/pages/`) from modular widgets (`src/components/`). Refactored nested conditions within checkout components to utilize early returns, simplifying component logic for easier review.
