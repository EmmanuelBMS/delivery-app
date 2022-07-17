import React from 'react';
import useHandleChange from '../../hooks/useHandleChange';

const INITIAL_INPUTS_STATE = {
  salesman: '',
  address: '',
  addressNumber: '',
};

export default function CheckoutForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const { salesman, address, addressNumber } = inputs;
  return (
    <form>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          id="seller"
          data-testid="customer_checkout__select-seller"
          onChange={ handleChange }
          value={ salesman }
          name="salesman"
        >
          <option hidden selected value>-- selecione um vendedor --</option>
          <option>Fulana</option>
          <option>Siclana</option>
          <option>Beltrana</option>
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
