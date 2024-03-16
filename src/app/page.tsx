"use client";
import useFetchData from "@/hooks/useFetchData";
import ProductCard from "./components/molecules/ProductCard";
import ErrorPage from "./components/molecules/error/ErrorPage";
import Loader from "./components/molecules/loader/Loader";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import { Product } from "@/helpers/types";

export default function Home() {
  const endpoint = 'https://fakestoreapi.com/products';
  const { loading, error, data } = useFetchData<Product[]>(endpoint);

  const getProductsLayout = () => {
    if (loading) {
      return <Loader />
    }
    if (data?.length) {
      return (
        data.map(product => {
          return (
            <div className="col-sm-6 col-md-4 col-lg-3 col-12">
              <ProductCard key={product.id} product={product} />
            </div>
          )
        })
      )
    }
    if (error) {
      return <ErrorPage />
    }
  };

  return (
    <Provider store={store}>
      <div className="container-fluid main-container">
        <div className="container">
          <div className="row">
            {getProductsLayout()}
          </div>
        </div>
      </div>
    </Provider>
  );
}
