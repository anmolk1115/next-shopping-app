import React from 'react';
import { Provider } from 'react-redux';
import ProductDetailContent from './ProductDetailContent';
import { store } from '../redux/store';

type ProductDetailType = {
    id: string
};

const ProductDetail = ({id}: ProductDetailType) => {
    
  return (
    <Provider store={store}>
        <ProductDetailContent id={id} />
    </Provider>
  )
}

export default ProductDetail