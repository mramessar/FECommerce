import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const OrderHistory = () => {
  const [user, loading] = useAuthState(auth)
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return
      const ref = collection(db, 'orders')
      const q = query(ref, where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setOrders(data)
    }

    fetchOrders()
  }, [user])

  if (loading) return <p>Loading...</p>
  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
      <h2>Your Order History 🧾</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{
              marginBottom: '2rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '12px',
              background: '#f7f5ff'
            }}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Date:</strong>{' '}
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : 'N/A'}
              <br />
              <strong>Total:</strong> ${order.total?.toFixed(2) ?? '0.00'}

              <h4 style={{ marginTop: '1rem' }}>Items:</h4>
              <ul>
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.title} — ${item.price} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="order-breakdown" style={{ marginTop: '1rem' }}>
                <h4>🧾 Order Summary</h4>
                <div className="breakdown-row">
                  <span>Subtotal:</span>
                  <span>${order.subtotal?.toFixed(2) ?? '0.00'}</span>
                </div>
                <div className="breakdown-row">
                  <span>Discounts:</span>
                  <span className="discount">–${order.discount?.toFixed(2) ?? '0.00'}</span>
                </div>
                <div className="breakdown-row">
                  <span>State Tax (NJ 6.625%):</span>
                  <span>+${order.tax?.toFixed(2) ?? '0.00'}</span>
                </div>
                {order.tip ? (
                  <div className="breakdown-row">
                    <span>Tip:</span>
                    <span>+${order.tip?.toFixed(2)}</span>
                  </div>
                ) : null}
                <div className="breakdown-total" style={{ marginTop: '0.5rem' }}>
                  <strong>Grand Total:</strong>
                  <strong>${order.total?.toFixed(2) ?? '0.00'}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderHistory
