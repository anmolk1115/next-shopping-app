import { Product } from '@/helpers/types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { useRouter } from 'next/navigation';
import { deleteItem, updateItemQuantity } from '../../redux/reducers/cartSlice';
import Button from '../../atoms/Button';
import ErrorPage from '../error/ErrorPage';
import Loader from '../loader/Loader';

const CartDataPage = () => {
    const dispatch = useAppDispatch();
    const { data: cartItems, loading, error } = useSelector((state: RootState) => state.cart);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (cartItems) {
            calculateTotalAmount();
        }
    }, [cartItems]);

    const updateQty = (item: Product, operation: string) => {
        dispatch(updateItemQuantity({ currItem: item, operation }));
    }

    const handleDeleteItem = (item: Product) => {
        dispatch(deleteItem(item));
    }

    const handleGoToHomePage = () => {
        router.push("/");
    }

    const handleGoToProductDetailPage = (id: number) => {
        let newRoute = `/product/${id}`;
        router.push(newRoute);
    }

    const handleGoToCheckout = () => {
        alert("Checkout implementation is in progress");
    }

    const calculateTotalAmount = () => {
        let total = 0;
        if (cartItems.length > 0) {
            total = cartItems.reduce((accum, currItem: Product): number => {
                return accum + (currItem.price * (currItem.orderQty ? currItem.orderQty : 0));
            }, 0);
        }
        setTotalCartAmount(total);
    }
    return (
        <>
            <section className="cart-container">
                {loading && <Loader />}
                {(cartItems && cartItems.length > 0) &&
                    <div className="cart-items-container">
                        <table cellPadding={10} style={{ width: "100%" }}>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th></th>
                                    <th>Item</th>
                                    <th>Price/Unit (Rs.)</th>
                                    <th>Qty</th>
                                    <th>Amount (Rs.)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartItems && cartItems.map(item => {
                                    return (
                                        <tr key={item.id} className='text-center'>
                                            <td style={{ cursor: "pointer" }} onClick={() => { handleGoToProductDetailPage(item.id) }}>
                                                <img src={item.image} className='object-fit-contain' width={50} height={50} alt="item-image" />
                                            </td>
                                            <td style={{ cursor: "pointer" }} onClick={() => { handleGoToProductDetailPage(item.id) }}>
                                                <p>{item.title}</p>
                                            </td>

                                            <td>{item.price}</td>
                                            <td>
                                                <button onClick={() => { updateQty(item, "decrease") }}>-</button>
                                                &nbsp;&nbsp;&nbsp;<span data-testid="orderQty">{item.orderQty} </span> &nbsp;&nbsp;&nbsp;
                                                <button onClick={() => { updateQty(item, "increase") }}>+</button>
                                            </td>
                                            <td>
                                                {(item.orderQty ? item.price * item.orderQty : 0).toFixed(2)}
                                            </td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => { handleDeleteItem(item) }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan={6}><hr /></td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "center" }} colSpan={5}><strong>Total</strong></td>
                                    <td style={{ textAlign: "left" }}><strong>{totalCartAmount.toFixed(2)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                }

                {(!cartItems || cartItems.length === 0) &&
                    <p className='d-flex justify-content-center align-items-center bg-white' style={{ padding: "20px" }}>Cart is empty. Please add some products to cart.</p>}
                <br />
                <div className="cart-btn-container d-flex justify-content-center">
                    {(cartItems && cartItems.length > 0) && <Button label="Checkout" classes="btn btn-warning " onClick={handleGoToCheckout} />} &nbsp;&nbsp;&nbsp;

                    <Button label="Continue Shopping" classes="secondaryButton btn btn-info" onClick={handleGoToHomePage} />
                </div>
                {error && <ErrorPage />}
            </section>
        </>
    )
}

export default CartDataPage;