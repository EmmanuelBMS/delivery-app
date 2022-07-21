import React from 'react';
import useHandleChange from '../../hooks/useHandleChange';

const INITIAL_INPUTS_STATE = {
  name: '',
  email: '',
  password: 0,
  role: '',
};

export default function AdminForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const { name, email, password, role } = INITIAL_INPUTS_STATE;

  return (
    <form>
      <label htmlFor="name">
        Nome
        <input
          placeholder="Nome e Sobrenome"
          name="name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}
