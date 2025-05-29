import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const Navbar = () => {
  const [user] = useAuthState(auth)
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || []

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <nav className="navbar pastel-sticky">
      <div>
        <Link to="/home">🏠 Mia’s Shop</Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/cart">🛒 Cart</Link>
            <Link to="/orders">📜 My Orders</Link>
            {adminEmails.includes(user.email) && (
              <Link to="/manage-products">🛠 Manage Products</Link>
            )}
            <span style={{ fontWeight: 'bold' }}>Hi, {user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
