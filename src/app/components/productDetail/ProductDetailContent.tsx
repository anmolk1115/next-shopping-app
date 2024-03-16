import { Product } from '@/helpers/types';
import useFetchData from '@/hooks/useFetchData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { addItem } from '../redux/reducers/cartSlice';
import { useDispatch } from 'react-redux';
import Loader from '../molecules/loader/Loader';
import Button from '../atoms/Button';
import ErrorPage from '../molecules/error/ErrorPage';

type ProductDetailContentPropsType = {
  id: string
}

const ProductDetailContent = ({ id }: ProductDetailContentPropsType) => {
  const endpoint = 'https://fakestoreapi.com/products';
  const [itemAdded, setItemAdded] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: product, loading, error } = useFetchData<Product>(`${endpoint}/${id}`);

  const handleAddToCart = () => {
    setItemAdded(true);
    if (product) {
      dispatch(addItem(product));
    }
  };

  const handleGoBack = () => {
    router.back();
  }

  const handleGoToCart = () => {
    router.push('/cart');
  }
  return (
    <>
      {loading && <Loader />}
      {product &&
        <section className={`product-detail-container ${id ? 'product-page' : ''}`}>
          <div>
            <img src={product?.image} alt="no-product-image" className={`product-detail-image ${id ? 'w-100 prod-detail-image' : ''}`} />
          </div>
          <div className='product-page-content' style={{ display: "flex", flexDirection: "column", gap: "20px", width: !id ? "60%" : '' }}>
            <div>
              <p>{product?.title}</p>
            </div>
            <div>
              <strong>{`Rs. ${product?.price}`}</strong>
            </div>
            <div>
              {`${product?.rating?.rate}`}<span className="fa fa-star checked"></span> {`(${product?.rating?.count})`}
            </div>
            <div>
              <strong>Description</strong>
              <p>{product?.description}</p>
            </div>

            <div>
              {itemAdded && <strong style={{ color: "green" }}>Added to cart</strong>}
              <br />
              <section className='btn-container'>
                {(!itemAdded ?
                  <Button label='Add to Cart' classes="primaryButton btn btn-warning" onClick={handleAddToCart} /> : <Button label='Go to Cart' classes="primaryButton btn btn-success" onClick={handleGoToCart} />)} &nbsp;&nbsp;&nbsp;
                <Button label='Go Back' classes="secondaryButton btn btn-info" onClick={handleGoBack} />
              </section>

            </div>
          </div>
        </section>
      }
      {error && <ErrorPage />}
    </>
  )
}

export default ProductDetailContent