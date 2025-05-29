import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { addToCart } from '../redux/cartSlice'
import ProductCard from './ProductCard'

describe('Cart Integration Test', () => {
  const product = {
    id: 1,
    title: 'Sunshine Ceramic Mug',
    description: 'Handcrafted spring-themed mug with pastel glaze.',
    price: 14.99,
    image: 'https://cdn.inspireuplift.com/uploads/images/seller_products/1688407319_MR-4720231155-good-morning-sunshine-mug-cute-coffee-cup.jpg',
  }

  const renderWithRedux = (component) => {
    const store = configureStore({ reducer: { cart: cartReducer } })
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    }
  }

  it('adds a product to the cart when button is clicked', () => {
    const { store } = renderWithRedux(
      <ProductCard product={product} onAddToCart={() => store.dispatch(addToCart(product))} />
    )

    fireEvent.click(screen.getByText(/add to cart/i))

    const state = store.getState().cart
    expect(state.items.length).toBe(1)
    expect(state.items[0].id).toBe(product.id)
  })
})
