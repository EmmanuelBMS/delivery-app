import React from 'react';
import useHandleChange from '../../hooks/useHandleChange';

const INITIAL_INPUTS_STATE = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

export default function CreateUserForm() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const { name, email, password } = inputs;
  const user = localStorage.getItem('user');

  async function submitSell() {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(inputs),
      });
      const userId = await response.json();
      if (userId.message) {
        console.log(userId.message);
      }
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
      <label htmlFor="name">
        Nome
        <input
          placeholder="Nome e Sobrenome"
          name="name"
          value={ name }
          onChange={ handleChange }
          data-testid="admin_manage__input-name"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          placeholder="seu-email@site.com.br"
          type="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          data-testid="admin_manage__input-email"
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          placeholder="*******"
          type="password"
          name="password"
          value={ password }
          onChange={ handleChange }
          data-testid="admin_manage__input-password"
        />
      </label>
      <select
        data-testid="admin_manage__select-role"
        onChange={ handleChange }
        name="role"
        defaultValue="seller"
      >
        Tipo
        <option
          value="seller"
        >
          Vendedor
        </option>
        <option
          value="customer"
        >
          Cliente
        </option>
        <option
          value="administrator"
        >
          Administrador
        </option>
      </select>
      <button
        type="submit"
        data-testid="admin_manage__button-register"
      >
        CADASTRAR
      </button>
    </form>
  );
}
