import cartReducer, { addToCart, removeFromCart, clearCart } from './cartSlice'

describe('cartSlice reducer', () => {
  const initialState = {
    items: [],
    totalPrice: 0,
  }

  const sampleItem = {
    id: 1,
    title: 'Sunshine Ceramic Mug',
    price: 14.99,
  }

  it('should handle addToCart', () => {
    const newState = cartReducer(initialState, addToCart(sampleItem))
    expect(newState.items.length).toBe(1)
    expect(newState.items[0].title).toBe(sampleItem.title)
    expect(newState.totalPrice).toBe(14.99)
  })

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ ...sampleItem, quantity: 1 }],
      totalPrice: 14.99,
    }
    const newState = cartReducer(stateWithItem, removeFromCart(sampleItem.id)) // ✅ FIXED
    expect(newState.items.length).toBe(0)
    expect(newState.totalPrice).toBe(0)
  })

  it('should handle clearCart', () => {
    const filledCart = {
      items: [{ ...sampleItem, quantity: 1 }],
      totalPrice: 14.99,
    }
    const newState = cartReducer(filledCart, clearCart())
    expect(newState.items).toEqual([])
    expect(newState.totalPrice).toBe(0)
  })
})
