import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../firebase'

const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || []


const ProductManager = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    if (!loading && (!user || !adminEmails.includes(user.email))) {
      navigate('/home') // redirect non-admins
    }
  }, [user, loading, navigate])

  const fetchProducts = async () => {
    const ref = collection(db, 'products')
    const snapshot = await getDocs(ref)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setProducts(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      const ref = doc(db, 'products', editingId)
      await updateDoc(ref, { ...form, price: Number(form.price) })
      setEditingId(null)
    } else {
      await addDoc(collection(db, 'products'), {
        ...form,
        price: Number(form.price)
      })
    }
    setForm({ title: '', description: '', price: '', category: '', image: '' })
    fetchProducts()
  }

  const handleEdit = (product) => {
    setForm(product)
    setEditingId(product.id)
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="product-manager" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Current Products</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(prod => (
          <li key={prod.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <strong>{prod.title}</strong> - ${prod.price.toFixed(2)} <br />
            <img src={prod.image} alt={prod.title} style={{ height: '80px', margin: '0.5rem 0' }} /><br />
            <button onClick={() => handleEdit(prod)}>Edit</button>{' '}
            <button onClick={() => handleDelete(prod.id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductManager