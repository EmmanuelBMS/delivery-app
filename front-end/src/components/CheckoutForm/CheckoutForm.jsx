import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHandleChange from '../../hooks/useHandleChange';
import { productsContext } from '../../context/ProductsContextProvider';
import { userContext } from '../../context/UserContextProvider';

const INITIAL_INPUTS_STATE = {
  sellerId: 2,
  address: '',
  addressNumber: '',
};

export default function CheckoutForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const [orderId, setOrderId] = useState({});
  const navegate = useNavigate();
  const { sellerId, address, addressNumber } = inputs;
  const {
    totalItemsPrice,
  } = useContext(productsContext);

  const { user } = useContext(userContext);

  const submitSell = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = totalItemsPrice();
      const response = await fetch('http://localhost:3001/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          userId: user.id,
          totalPrice,
          ...inputs,
          status: 'Pendente',
        },
      });
      const json = await response.json();
      if (json.message) {
        console.log(json.message);
      }
      const { id } = orderId;
      setOrderId(id);
      navegate(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={ submitSell }>
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
          name="address"
          value={ address }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="number"
          data-testid="customer_checkout__input-addressNumber"
          placeholder="198"
          onChange={ handleChange }
          name="addressNumber"
          value={ addressNumber }
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
