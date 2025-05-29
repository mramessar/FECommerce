import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { auth, db } from './firebase'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductManager from './pages/ProductManager'
import OrderHistory from './pages/OrderHistory'



console.log('Firebase Auth:', auth)
console.log('Firestore DB:', db)

function App() {
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
