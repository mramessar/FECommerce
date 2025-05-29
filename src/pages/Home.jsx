import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

import ProductCard from '../components/ProductCard'
import CategorySelect from '../components/CategorySelect'
import HeroBanner from '../components/HeroBanner'

import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

const fetchProducts = async (category) => {
  const ref = collection(db, 'products')
  const q = category ? query(ref, where('category', '==', category)) : ref
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const fetchCategories = async () => {
  const ref = collection(db, 'products')
  const snapshot = await getDocs(ref)
  const categories = new Set()
  snapshot.docs.forEach(doc => categories.add(doc.data().category))
  return Array.from(categories)
}

const Home = () => {
  const [category, setCategory] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const dispatch = useDispatch()

  const productsQuery = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  })

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  if (productsQuery.isLoading || categoriesQuery.isLoading) return <div>Loading...</div>
  if (productsQuery.isError || categoriesQuery.isError) return <div>Error fetching data</div>

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <HeroBanner />

      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#caffbf',
          color: '#1b4332',
          padding: '1rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          ✅ Item added to cart!
        </div>
      )}

      <div style={{ margin: '1rem 0' }}>
        <label><strong>Filter by Category:</strong></label>{' '}
        <CategorySelect
          categories={categoriesQuery.data}
          selected={category}
          onChange={setCategory}
        />
      </div>

      <div className="products">
        {productsQuery.data.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => {
              dispatch(addToCart(product))
              setShowPopup(true)
              setTimeout(() => setShowPopup(false), 2000)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
