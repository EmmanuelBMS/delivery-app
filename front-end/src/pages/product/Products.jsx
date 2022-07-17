import React, { useEffect, useContext } from 'react';
import './products.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';
import { productsContext } from '../../context/ProductsContextProvider';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Products() {
  const {
    productsApi,
    totalItemsPrice,
    getProductsToLocalStorage,
    handleProductsRequest,
  } = useContext(productsContext);
  const { requestTokenValidate } = useContext(userContext);
  useEffect(() => {
    requestTokenValidate();
    getProductsToLocalStorage();
    handleProductsRequest();
  }, []);
  return (
    <div>
      <Navbar />
      <main className="flex py-6 items-center justify-center gap-6 flex-wrap">
        {
          productsApi.map((item) => (
            <ProductCard key={ item.id } item={ item } />
          ))
        }
        <Link
          className="checkoutButton"
          data-testid="customer_products__checkout-bottom-value"
          to="/customer/checkout"
        >
          Ver Carrinho:
          <span>
            R$
            {totalItemsPrice().toFixed(2) || 0}
          </span>
        </Link>
      </main>
    </div>
  );
}
