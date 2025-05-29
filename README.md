# Mia's Extra Special Shop – A Pastel-Themed React E-Commerce App

Welcome to **Mia's Extra Special Shop**, a fully functional e-commerce web application built with **React**, **Redux Toolkit**, and **Firebase**. Styled with a cheerful spring pastel aesthetic, this app delivers seamless shopping, secure checkout, and persistent user experiences.

---

## Features Overview

- Add-to-cart functionality with quantity controls  
- Discount tiers that stack based on subtotal  
- Firebase Firestore integration for products and order storage  
- Firebase Authentication for secure login and protected routes  
- Admin-only product manager for CRUD operations  
- Detailed order breakdown with tax, discounts, and tip  
- Test coverage for Redux slice and components  
- Spring pastel design with playful animations and hover effects  

---

## Project Structure

```
src/
│
├── components/           # Reusable UI components (e.g., ProductCard, Cart)
├── pages/                # Main pages: Home, CartPage, OrderHistory, etc.
├── redux/                # Redux slices (e.g., cartSlice)
├── utils/                # Session persistence + helpers
├── firebase.js           # Firebase config
├── App.jsx               # Root app routing
├── index.js              # Entry point
└── styles/               # Theme and styling overrides
```

---

## Pages & Functionality

### HomePage

- Renders a grid of products fetched from Firestore
- Users can add products to cart and view details

### CartPage

- Displays items with full quantity control
- Dynamically applies **discount tiers**:
  - $5 off at $25+
  - 15% off at $50+
  - Free shipping at $100+
- Calculates:
  - Tax (NJ 6.625%)
  - Tip (optional)
  - Grand Total
- Checkout saves order to Firestore and resets cart

### OrderHistory

- Auth-protected route
- Lists past orders with:
  - Breakdown of subtotal, discounts, tax, tip, total
  - Itemized products and quantities
- Fetched from Firebase, ordered by date

### ProductManager (Admin-Only)

- Shows only for admin users (email-based check)
- Create, update, and delete products in Firestore

---

## Authentication

Implemented using **Firebase Auth**:

- Google Login + Email/Password options
- React-Firebase-Hooks for real-time auth state
- Admin privileges assigned via `.env` email list

---

## Firebase Integration

**Firebase Modules Used:**

| Service          | Purpose                              |
|------------------|--------------------------------------|
| Authentication   | User login and access control        |
| Firestore        | Product and Order database           |
| ServerTimestamp  | Time tracking for order sorting      |

Order data stored includes:

- `userId`, `items[]`, `subtotal`, `discount`, `tax`, `tip`, `total`, `createdAt`

---

## Tests

### `src/redux/cartSlice.test.jsx`

- Verifies reducer logic:
  - `addToCart`, `removeFromCart`, `clearCart`

### `src/components/ProductCard.test.jsx`

- Snapshot test for rendering product card properly

### `src/components/CartIntegration.test.jsx`

- End-to-end test of cart logic across dispatches

**Run tests:**

```
bash
npm test
```

---

## Spring Pastel Theme

The app is styled with a soft pastel palette inspired by spring and Easter. Animations and hover effects create a playful, light aesthetic to make the shopping experience delightful.

---

## Environment Setup

**Required `.env` values:**

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_ADMIN_EMAIL=admin@example.com
```

---

## Final Notes

- All prices are for demo purposes  
- Data is synced live with Firebase Firestore  
- Users must be logged in to checkout or view order history  

---

## Future Improvements (Post-MVP)

- Stripe or PayPal integration  
- Product categories & filtering  
- Persistent user cart across sessions  
- Unit tests for more components  
- Product image uploads via Firebase Storage
