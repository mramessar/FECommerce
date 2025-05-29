import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Sunshine Ceramic Mug',
    description: 'Handcrafted spring-themed mug with pastel glaze.',
    price: 14.99,
    image: 'https://cdn.inspireuplift.com/uploads/images/seller_products/1688407319_MR-4720231155-good-morning-sunshine-mug-cute-coffee-cup.jpg',
  };

  test('renders product title, price, and image', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    expect(screen.getByText('Sunshine Ceramic Mug')).toBeInTheDocument();
    expect(screen.getByText('$14.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  test('calls onAddToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    fireEvent.click(screen.getByText(/add to cart/i));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});
