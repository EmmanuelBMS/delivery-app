import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const productsContext = createContext({});

export default function ProductsContextProvider({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);
  const [productsApi, setProductsApi] = useState([]);

  const totalItemsPrice = () => productsInCart.reduce((acc, curr) => {
    const itemPrice = Number(curr.price);
    const itemCount = curr.count;
    const priceXCount = itemPrice * itemCount;
    const totalPrice = acc + priceXCount;
    return Number(totalPrice.toFixed(2));
  }, 0);

  function getProductsToLocalStorage() {
    const products = JSON.parse(localStorage.getItem('carrinho'));
    if (products) {
      setProductsInCart(products);
    }
  }
  async function handleProductsRequest() {
    try {
      const response = await fetch('http://localhost:3001/products');
      const json = await response.json();
      if (json) {
        const productWithCount = json
          .map((item) => ({ ...item, count: 0 }));
        setProductsApi(productWithCount);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const changeDotToCommaOfPrice = (price) => price.toString().replace('.', ',');
  const valueToProvide = useMemo(() => ({
    productsInCart,
    setProductsInCart,
    setProductsApi,
    productsApi,
    handleProductsRequest,
    totalItemsPrice,
    getProductsToLocalStorage,
    changeDotToCommaOfPrice,
  }), [productsInCart,
    setProductsInCart,
    setProductsApi,
    productsApi,
    handleProductsRequest,
    totalItemsPrice,
    getProductsToLocalStorage,
    changeDotToCommaOfPrice]);
  return (
    <productsContext.Provider value={ valueToProvide }>
      {children}
    </productsContext.Provider>
  );
}

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
