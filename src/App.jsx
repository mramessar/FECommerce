import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Home from './pages/Home'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductManager from './pages/ProductManager'
import OrderHistory from './pages/OrderHistory'

import { auth, db } from './firebase'
import { loadCartFromStorage } from './redux/cartSlice'
import { saveCartToSession, loadCartFromSession } from './utils/session'

console.log('Firebase Auth:', auth)
console.log('Firestore DB:', db)

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.items)

  // Load cart from sessionStorage when app first mounts
  useEffect(() => {
    const savedCart = loadCartFromSession()
    console.log('Restoring cart from sessionStorage:', savedCart)
    dispatch(loadCartFromStorage(savedCart))
  }, [dispatch])

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    console.log('Saving cart to sessionStorage:', cart)
    saveCartToSession(cart)
  }, [cart])

  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/manage-products" element={<ProductManager />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all 404 */}
        </Routes>
      </main>
    </>
  )
}

export default App
