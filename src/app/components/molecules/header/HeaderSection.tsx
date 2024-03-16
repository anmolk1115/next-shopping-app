import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const HeaderSection = () => {
    const router = useRouter();
    const { data: cartItems } = useSelector((state: RootState) => state.cart);
    const cartItemsLength = cartItems?.length;

    const handleGoCart = () => {
        router.push("/cart");
    }

    const handleGoToHomePage = () => {
        router.push("/");
    }
    return (
        <header className='header-container'>
            <section className='header-left-corner' >
                <strong className='header-title' onClick={handleGoToHomePage}>PO Ecommerce</strong>
            </section>
            <section className='header-right-corner'>
                <span onClick={handleGoCart} className='cart-icon position-relative'>
                    <i className="fa fa-shopping-cart" /> 
                    {cartItemsLength ? <div className='cart-container-count position-absolute'>{cartItemsLength}</div> : ''}
                </span>
            </section>
        </header>
    )
}

export default HeaderSection