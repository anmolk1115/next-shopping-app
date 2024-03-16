'use client';
import ProductDetail from '@/app/components/productDetail/ProductDetail';
import React from 'react';

type ProductPagePropsType = {
    params: {
        id: string
    }
};

const page = ({params: {id}}: ProductPagePropsType) => {

  return (
    <ProductDetail id={id}/>
  )
}

export default page;