import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const handleCheckout = async ({ user, cartItems, userTip }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tier1 = subtotal >= 25 ? 5 : 0;
  const tier2 = subtotal >= 50 ? subtotal * 0.15 : 0;
  const discount = tier1 + tier2;
  const tax = subtotal * 0.06625;
  const tip = userTip ?? 0;
  const total = subtotal - discount + tax + tip;

  const order = {
    userId: user.uid,
    items: cartItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    tip: parseFloat(tip.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'orders'), order);
    console.log('Order saved to Firebase:', order);
  } catch (err) {
    console.error('Error saving order to Firebase:', err);
    throw err;
  }
};
