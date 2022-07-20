import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Plus, Minus } from 'phosphor-react';
import { productsContext } from '../../context/ProductsContextProvider';

const NUMBER_TO_REMOVE_ITEMS = -1;
const NUMBER_TO_ADD_ITEMS = 1;
export default function ProductCard({ item }) {
  const {
    productsInCart,
    setProductsInCart,
    changeDotToCommaOfPrice } = useContext(productsContext);
  const countItemInCart = productsInCart.find((it) => it.id === item.id)?.count;
  const [itemCount, setItemCount] = useState(countItemInCart || 0);
  const copyCartState = [...productsInCart];

  function addCartitemsToLocalStorage(array) {
    localStorage.setItem('carrinho', JSON.stringify(array));
  }

  function saveNewCart(cart) {
    setProductsInCart(cart);
    addCartitemsToLocalStorage(cart);
  }
  function countInputValidate(productObj, count) {
    if (count <= 0) {
      setItemCount(0);
      productObj.count = 0;
      const productsCartFiltred = copyCartState.filter((product) => product.count !== 0);
      saveNewCart(productsCartFiltred);
      return;
    }
    setItemCount(count);
    if (!productObj) {
      copyCartState.push({ ...item, count });
    } else {
      productObj.count = count;
    }
    saveNewCart(copyCartState);
  }

  function handleCountitems(count, isInput = false) {
    const countToNumber = Number(count);
    const productFoundInCart = copyCartState.find((it) => it.id === item.id);
    const newCount = Number(itemCount) + countToNumber;
    const IsNewCountValid = newCount >= 0;
    if (!IsNewCountValid) return setItemCount(0);
    if (isInput) {
      return countInputValidate(productFoundInCart, countToNumber);
    }
    if (!productFoundInCart) {
      copyCartState.push({ ...item, count: 1 });
    }
    if (productFoundInCart) {
      if (!newCount) {
        const indexObjInCart = copyCartState.indexOf(productFoundInCart);
        copyCartState.splice(indexObjInCart, 1);
      } else {
        productFoundInCart.count = newCount;
      }
    }
    setItemCount(newCount);
    saveNewCart(copyCartState);
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
            onClick={ () => handleCountitems(NUMBER_TO_REMOVE_ITEMS) }
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
            className="flex justify-center items-center"
            type="button"
          >
            <Minus
              className="mr-2 text-white"
              size={ 18 }

            />
          </button>

          <input
            onChange={ (e) => handleCountitems(e.target.value, true) }
            type="text"
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
            className=" bg-white outline-none text-zinc-600 w-[2rem] px-2 "
            value={ itemCount }
          />
          <button
            onClick={ () => handleCountitems(NUMBER_TO_ADD_ITEMS) }
            data-testid={ `customer_products__button-card-add-item-${item.id}` }
            className="flex justify-center items-center"
            type="button"
          >
            <Plus
              className="ml-2 text-white"
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
