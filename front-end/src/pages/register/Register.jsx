import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/UserContextProvider';
import AlertModal from '../../components/AlertModal/AlertModal';
import useModal from '../../hooks/useModal';
import useHandleChange from '../../hooks/useHandleChange';
import './register.css';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGHT = 12;
const INITIAL_INPUTS_STATE = {
  email: '',
  password: '',
  name: '',
};

export default function Register() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const [isModalOpen, toggleModalStatus] = useModal();
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const emailRegex = /\S+@\S+\.\S+/;
  const { name, email, password } = inputs;
  const isValidEmail = !emailRegex.test(email);
  const isValidPassword = password.length < MIN_PASSWORD_LENGTH;
  const isValidName = name.length < MIN_NAME_LENGHT;
  const isRegisterInfosValid = isValidEmail || isValidPassword || isValidName;

  async function handleRegisterRequest(newUser) {
    const newUserWithRole = { ...newUser, role: 'customer' };
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserWithRole),
      });
      const json = await response.json();
      if (json.message) {
        toggleModalStatus();
      } else {
        setUser(json);
        localStorage.setItem('user', JSON.stringify(json));
        navigate('/customer/products');
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = inputs;
    handleRegisterRequest(newUser);
  }
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <h1
        className="text-xl mt-10 font-bold"
      >
        Cadastro
      </h1>
      <div className="bg-zinc-200 rounded-lg p-4 h-[20rem]">
        <form
          onSubmit={ handleSubmit }
          className="flex flex-col gap-4"
        >
          <label
            className="flex flex-col"
            htmlFor="emailInput"
          >
            Nome
            <input
              className="border rounded focus:outline-green-500 p-1 outline-transparent"
              onChange={ handleChange }
              id="emailInput"
              name="name"
              value={ name }
              type="text"
              placeholder="seu nome"
              data-testid="common_register__input-name"
            />
          </label>
          <label
            className="flex flex-col"
            htmlFor="emailInput"
          >
            Email
            <input
              className="border rounded focus:outline-green-500 p-1 outline-transparent"
              onChange={ handleChange }
              id="emailInput"
              name="email"
              value={ email }
              type="email"
              placeholder="seu-email@site.com.br"
              data-testid="common_register__input-email"
            />
          </label>

          <label
            className="flex flex-col"
            htmlFor="passwordInput"
          >
            Senha
            <input
              className="border rounded focus:outline-green-500 p-1 outline-transparent"
              onChange={ handleChange }
              id="passwordInput"
              name="password"
              value={ password }
              type="password"
              placeholder="Senha"
              data-testid="common_register__input-password"
            />
          </label>
          <button
            disabled={ isRegisterInfosValid || isModalOpen }
            className="registerBtn"
            type="submit"
            data-testid="common_register__button-register"

          >
            cadastrar
          </button>
        </form>
      </div>
      {isModalOpen && (
        <AlertModal
          message="Erro: nome ou email ja cadastrado!"
          dataTestId="common_register__element-invalid_register"
          toggleModalStatus={ toggleModalStatus }
        />
      )}
    </div>
  );
}
