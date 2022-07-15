import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Plus, Minus } from 'phosphor-react';
import { productsContext } from '../../context/ProductsContextProvider';

export default function ProductCard({ item }) {
  const {
    productsApi,
    productsInCart,
    setProductsInCart,
  } = useContext(productsContext);
  const countItemInCart = productsInCart.find((it) => it.id === item.id)?.count;
  const [itemCount, setItemCount] = useState(countItemInCart || 0);

  const changeDotToCommaOfPrice = (price) => price.toString().replace('.', ',');

  function addCartItensToLocalStorage(array) {
    localStorage.setItem('carrinho', JSON.stringify(array));
  }

  function removeItemByIndex(cart, ind, rem = false) {
    const productFoundInCart = cart.find((it) => it.id === item.id);

    if (rem) {
      const index = cart.indexOf(ind);
      productFoundInCart.count -= 1;
      if (productFoundInCart.count === 0) productsInCart.splice(index, 1);
      setProductsInCart(cart);
    } else {
      const index = cart.indexOf(ind);
      productFoundInCart.count += 1;
      productsInCart.splice(index, 1);
      setProductsInCart(cart);
    }
  }

  function handleRemoveItemInCart() {
    const cart = [...productsInCart];
    const productFoundInCart = productsInCart.find((it) => it.id === item.id);

    if (itemCount > 0) {
      const index = productsInCart.indexOf(productFoundInCart);
      removeItemByIndex(cart, index, true);
      setItemCount((curr) => curr - 1);
    }
  }

  function handleAddItemInCart() {
    const cart = [...productsInCart];
    const productFoundInCart = cart.find((it) => it.id === item.id);
    if (productFoundInCart) {
      const index = productsApi.indexOf(productFoundInCart);
      removeItemByIndex(cart, index);
    } else {
      cart.push({ ...item, count: 1 });
      setProductsInCart(cart);
    }
    addCartItensToLocalStorage(cart);
    setItemCount((curr) => curr + 1);
  }

  return (
    <div
      className="productCard"
      key={ item.id }
    >
      <span
        data-testid={ `customer_products__element-card-price-${item.id}` }
        className="cardPrice"
      >
        R$
        {changeDotToCommaOfPrice(item.price)}
      </span>
      <img
        alt=""
        data-testid={ `customer_products__img-card-bg-image-${item.id}` }
        src={ item.url_image }
      />
      <div className="flex flex-col bg-blue-100 py-2 items-center">
        <span
          data-testid={ `customer_products__element-card-title-${item.id}` }
        >
          {item.name}
        </span>
        <div className="flex rounded border bg-[#256B52] px-2 mb-3">
          <button
            onClick={ () => handleRemoveItemInCart() }
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
            className="flex text-white justify-center items-center"
            type="button"
          >
            <Minus
              className="mr-2"
              size={ 18 }

            />
          </button>

          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
            className=" bg-white text-zinc-600 px-3"
            value={ itemCount }
          />
          {/* {itemCount} */}
          <button
            onClick={ () => handleAddItemInCart() }
            data-testid={ `customer_products__button-card-add-item-${item.id}` }
            className="flex justify-center items-center"
            type="button"
          >
            <Plus
              className="ml-2"
              size={ 20 }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.objectOf.isRequired,
};
