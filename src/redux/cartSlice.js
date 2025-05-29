import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload
      const existing = state.items.find(p => p.id === item.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalPrice = calculateTotalPrice(state.items)
    },

    decrementQuantity(state, action) {
      const item = state.items.find(p => p.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(p => p.id !== action.payload)
      }
      state.totalPrice = calculateTotalPrice(state.items)
    },

    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    },

    loadCartFromStorage(state, action) {
      state.items = action.payload || []
      state.totalPrice = calculateTotalPrice(state.items)
    },
  },
})

function calculateTotalPrice(items) {
  return parseFloat(
    items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)
  )
}

export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions

export default cartSlice.reducer
