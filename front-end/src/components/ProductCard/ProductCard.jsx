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

  function saveNewCart(cart) {
    setProductsInCart(cart);
    addCartItensToLocalStorage(cart);
  }

  function handleCountItens(count, isInput = false) {
    /* função 2 */
    if (count === '') {
      const stateStringToArray = Array(String(count));
      stateStringToArray.pop();
      if (!stateStringToArray.length) {
        return setItemCount(0);
      }
      const joinCountNumbers= stateStringToArray.join('')
      setItemCount(Number(joinCountNumbers))
      return
    }
    const countToNumber = Number(count);
    const cart = [...productsInCart];
    const productFoundInCart = cart.find((it) => it.id === item.id);
    const newCount = Number(itemCount) + countToNumber;
    const IsNewCountValid = newCount >= 0;
    /* adicionar logica do input com early return

  */
    if (!IsNewCountValid) return setItemCount(0);
/* função3 */
    if (isInput) {
      console.log('number',countToNumber,'state',itemCount,'count',count);

      if (countToNumber <= 0) {
      setItemCount(0);
        productFoundInCart.count = 0;
        const productsCartFiltred = cart.filter((item) => item.count !== 0);
       /* return */ saveNewCart(productsCartFiltred);
       return;
      }
      
      setItemCount(countToNumber);
      /* é input e nao existe */
      if (!productFoundInCart) {
        cart.push({ ...item, count: countToNumber });
      }
      /* é input e existe */
      else {
        productFoundInCart.count = countToNumber;
      }
      saveNewCart(cart);
      return;
    }

    /* não input e nao exist */
    if (!productFoundInCart) {
      cart.push({ ...item, count: 1 });
    }
    /* nao input e existe */
    if (productFoundInCart) {
      if (!newCount) {
        const indexObjInCart = cart.indexOf(productFoundInCart);
        productsInCart.splice(indexObjInCart, 1);
      } else {
        productFoundInCart.count = newCount;
      }
    }
    setItemCount(newCount);
    saveNewCart(cart);
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
            onClick={ () => handleCountItens(-1) }
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
            onChange={ (e) => handleCountItens(e.target.value, true) }
            type="number"
            inputMode="number"
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
            className=" bg-white text-zinc-600 w-[100%] px-6 "
            value={ Number(itemCount) }
          />
          <button
            onClick={ () => handleCountItens(1) }
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
