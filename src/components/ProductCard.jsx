import React from 'react'
import { useDispatch } from 'react-redux'



const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 100)}...</p>
      <p><strong>${product.price}</strong></p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  image: {
    height: '200px',
    objectFit: 'contain',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: '0.9rem',
    color: '#555',
  },
  price: {
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
}

export default ProductCard
