import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  decrementQuantity,
  addToCart,
  clearCart,
  loadCartFromStorage,
} from '../redux/cartSlice'
import { saveCartToSession, loadCartFromSession } from '../utils/session'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { handleCheckout as processCheckout } from '../components/CheckoutForm'


const CartPage = () => {
  const cart = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [tip, setTip] = useState(0)
  const [user] = useAuthState(auth)

  const getTotalQuantity = () =>
    cart.reduce((total, item) => total + item.quantity, 0)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const tier1 = subtotal >= 25 ? 5 : 0
  const tier2 = subtotal >= 50 ? 0.15 * subtotal : 0
  const tier3 = subtotal >= 100 ? 0 : 5.99
  const discountTotal = tier1 + tier2

  const tax = 0.06625 * subtotal

  const finalTotal = (subtotal - discountTotal + tier3 + tax + parseFloat(tip || 0)).toFixed(2)

  const handleCheckout = async () => {
    if (!user) return alert('You must be logged in to checkout!')

    try {
      await processCheckout({
        user,
        cartItems: cart,
        userTip: parseFloat(tip || 0),
      })

      dispatch(clearCart())
      saveCartToSession([])
      setShowConfirmation(true)

      setTimeout(() => {
        setShowConfirmation(false)
        navigate('/home')
      }, 3000)
    } catch (error) {
      console.error('Error during checkout:', error)
      alert('Something went wrong. Try again.')
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty. Go find something adorable!</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} className="cart-card">
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <strong>{item.title}</strong>
                  <p>${item.price} x {item.quantity}</p>
                  <div>
                    <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <hr style={{ margin: '2rem 0' }} />

          <div className="cart-summary">
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <p style={{ color: 'green' }}>
              {tier1 > 0 && <>🎁 $5 Discount<br /></>}
              {tier2 > 0 && <>💸 15% Off Discount<br /></>}
              {tier3 === 0
                ? <>🚚 Free Shipping<br /></>
                : <>🚚 Shipping: $5.99<br /></>}
            </p>
            <h4>Total Discounts: -${discountTotal.toFixed(2)}</h4>

            <p>🧾 NJ Sales Tax (6.625%): ${tax.toFixed(2)}</p>

            <div style={{ margin: '1rem 0' }}>
              <label htmlFor="tip">💝 Tip Jar (optional): $</label>
              <input
                type="number"
                min="0"
                step="0.50"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                style={{
                  borderRadius: '8px',
                  padding: '0.5rem',
                  width: '80px',
                  marginLeft: '0.5rem'
                }}
              />
            </div>

            <h2>Final Total: ${finalTotal}</h2>
            <button onClick={handleCheckout}>✅ Place Order</button>
          </div>
        </>
      )}

      {showConfirmation && (
        <div className="checkout-confirmation">
          🎉 Thank you for your order!
          <p>You saved ${discountTotal.toFixed(2)} today!</p>
        </div>
      )}
    </div>
  )
}

export default CartPage
