import React, { useEffect, useContext } from 'react';
import './products.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';
import { productsContext } from '../../context/ProductsContextProvider';
import ProductCard from '../../components/ProductCard/ProductCard';
import usePrevious from '../../hooks/usePrevius';

export default function Products() {
  const {
    productsInCart,
    productsApi,
    totalItemsPrice,
    getProductsToLocalStorage,
    handleProductsRequest,
  } = useContext(productsContext);
  const checkPrevius = usePrevious(productsInCart);

  useEffect(() => {
    if (checkPrevius !== productsInCart) { totalItemsPrice(); }
  });

  const { getUserToLocalStorage } = useContext(userContext);

  useEffect(() => {
    getUserToLocalStorage();
    getProductsToLocalStorage();
    handleProductsRequest();
  }, [getProductsToLocalStorage, getUserToLocalStorage, handleProductsRequest]);

  return (
    <div>
      <Navbar />
      <main className="flex py-6 gap-6 px-14  ">
        {
          productsApi.map((item) => (
            <ProductCard key={ item.id } item={ item } />
          ))
        }
        <Link
          className="checkoutButton"
          data-testid="customer_products__checkout-bottom-value"
          to="/"
        >
          Ver Carrinho:
          <span>
            R$
            {totalItemsPrice() || 0}
          </span>
        </Link>
      </main>
    </div>
  );
}
