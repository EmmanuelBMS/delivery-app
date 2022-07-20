import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useHandleChange from '../../hooks/useHandleChange';
import { productsContext } from '../../context/ProductsContextProvider';
import { userContext } from '../../context/UserContextProvider';

const INITIAL_INPUTS_STATE = {
  sellerId: 2,
  deliveryAddress: '',
  deliveryNumber: '',
};

export default function CheckoutForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const navegate = useNavigate();
  const { sellerId, deliveryAddress, deliveryNumber } = inputs;
  const {
    productsInCart,
    totalItemsPrice,
  } = useContext(productsContext);

  const { user } = useContext(userContext);
  const cartArray = productsInCart
    .map((prod) => ({ quantity: prod.count, productId: prod.id }));
  const totalPrice = totalItemsPrice();
  const newSale = {
    sale: {
      userId: user.id,
      totalPrice,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
    },
    product: cartArray,
  };

  async function submitSell() {
    try {
      const response = await fetch('http://localhost:3001/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newSale),
      });
      const orderId = await response.json();
      if (orderId.message) {
        console.log(orderId.message);
      }
      navegate(`/customer/orders/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitSell();
  }
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          id="seller"
          data-testid="customer_checkout__select-seller"
          onChange={ handleChange }
          value={ sellerId }
          name="sellerId"
        >
          <option selected value={ 2 }>Fulana Pereira</option>
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          data-testid="customer_checkout__input-address"
          placeholder="Travessa Terceira da Castanheira"
          onChange={ handleChange }
          name="deliveryAddress"
          value={ deliveryAddress }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="number"
          data-testid="customer_checkout__input-addressNumber"
          placeholder="198"
          onChange={ handleChange }
          name="deliveryNumber"
          value={ deliveryNumber.toString() }
        />
      </label>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
