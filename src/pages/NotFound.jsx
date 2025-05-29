import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Uh-oh! The page you’re looking for doesn't exist.</p>
      <Link to="/home">🏠 Go back home</Link>
    </div>
  )
}

export default NotFound
