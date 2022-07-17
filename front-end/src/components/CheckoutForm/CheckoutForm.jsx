import React, { useContext } from 'react';
import useHandleChange from '../../hooks/useHandleChange';
import { productsContext } from '../../context/ProductsContextProvider';

const INITIAL_INPUTS_STATE = {
  sellerId: 0,
  deliveryAddress: '',
  deliveryNumber: '',
};

export default function CheckoutForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const { sellerId, deliveryAddress, deliveryNumber } = inputs;
  const {
    totalItemsPrice,
  } = useContext(productsContext);

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
          totalPrice,
          ...inputs,
        },
      });
      const json = await response.json();

      if (json.message) {
        console.log(json.message);
      }
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
          <option hidden selected value>-- selecione um vendedor --</option>
          <option value={ 1 }>Fulana</option>
          <option value={ 2 }>Siclana</option>
          <option value={ 3 }>Beltrana</option>
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
          value={ deliveryNumber }
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
