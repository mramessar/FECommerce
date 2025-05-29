const CART_KEY = 'redux_cart'

export const saveCartToSession = (cart) => {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const loadCartFromSession = () => {
  const cart = sessionStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}
