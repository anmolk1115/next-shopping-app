'use client';
import { Product } from '@/helpers/types';
import React, { useState } from 'react';
import { AppDispatch, useAppDispatch } from '../redux/store';
import { addItem } from '../redux/reducers/cartSlice';
import { useRouter } from 'next/navigation';

type ProductCardType = {
    product: Product
}

const ProductCard: React.FC<ProductCardType> = (props: ProductCardType) => {
    const [itemAdded, setItemAdded] = useState<Boolean>(false);
    const [onHoverState, setHoverState] = useState<Boolean>(false);
    const dispatch: AppDispatch = useAppDispatch();
    const router = useRouter();
    const { product: {
        id, title, price, image, rating
    }, product } = props;

    const handleViewMore = () => {
        router.push(`/product/${id}`);
    }

    const handleGoToCart = () => {
        router.push("/cart");
    }

    const handleAddToCart = (product: Product) => {
        setItemAdded(true);
        dispatch(addItem(product));
    }
    return (
        <section onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} className={`product-card card mx-auto mb-3 ${onHoverState ? 'shadow' : 'shadow-sm'}`}>
            <div>
                <img src={image} alt="no-product-image" className="product-card-image mx-auto d-block object-fit-contain" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", alignItems: "center" }}>
                <div>
                    <p className="product-card-title text-center">{title.substring(0, 38)}</p>
                </div>
                <div className='d-flex justify-content-between w-100'>
                    <strong>{`₹ ${price}`}</strong><div>{`${rating.rate}`}<span className="fa fa-star checked"></span> {`(${rating.count})`} </div>
                </div>
                <div className='d-flex w-100 justify-content-between' style={{ marginTop: "20px" }}>
                    {itemAdded ?
                        <button className='btn btn-success' onClick={handleGoToCart}>Go to Cart</button> :
                        <button className='btn btn-warning' onClick={() => { handleAddToCart(product) }}>Add to Cart</button>}
                    &nbsp;
                    <button className='btn btn-info' onClick={handleViewMore}>View More</button>
                </div>
            </div>
        </section>
    )
}

export default ProductCard;