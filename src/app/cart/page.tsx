"use client";
import React from 'react';
import { store } from '../components/redux/store'
import { Provider } from 'react-redux';
import CartDataPage from '../components/molecules/cartData/CartDataPage';

const CartPage = () => {
  return (
    <Provider store={store}>
      <CartDataPage />
    </Provider>
    
  )
}

export default CartPage;