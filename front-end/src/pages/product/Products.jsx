import React, { useEffect, useContext } from 'react';
import './products.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';
import { productsContext } from '../../context/ProductsContextProvider';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Products() {
  const {
    productsInCart,
    productsApi,
    totalItemsPrice,
    getProductsToLocalStorage,
    handleProductsRequest,
    changeDotToCommaOfPrice,
  } = useContext(productsContext);
  const { requestTokenValidate } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    requestTokenValidate();
    getProductsToLocalStorage();
    handleProductsRequest();
  }, []);
  function redirectToCheckoutPage() {
    navigate('/customer/checkout');
  }
  return (
    <div>
      <Navbar />
      <main className="flex py-6 items-center justify-center gap-6 flex-wrap">
        {
          productsApi.map((item) => (
            <ProductCard key={ item.id } item={ item } />
          ))
        }
        <button
          onClick={ redirectToCheckoutPage }
          disabled={ !productsInCart.length }
          data-testid="customer_products__button-cart"
          className="checkoutButton"
          type="button"
        >
          Ver carrinho R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {changeDotToCommaOfPrice(totalItemsPrice() || 0)}

          </span>
        </button>
      </main>
    </div>
  );
}
