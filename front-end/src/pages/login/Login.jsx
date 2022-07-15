import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal/AlertModal';
import { userContext } from '../../context/UserContextProvider';
import useHandleChange from '../../hooks/useHandleChange';
import useModal from '../../hooks/useModal';
import './login.css';

const MIN_PASSWORD_LENGTH = 6;
const INITIAL_INPUTS_STATE = {
  email: '',
  password: '',
};
export default function Login() {
  const [inputs, handleChange] = useHandleChange(INITIAL_INPUTS_STATE);
  const { setUser } = useContext(userContext);
  const [isModalOpen, toggleModalStatus] = useModal();
  const { email, password } = inputs;
  const navegate = useNavigate();
  const emailRegex = /\S+@\S+\.\S+/;
  const isLoginInfosValid = !emailRegex.test(email)
    || password.length < MIN_PASSWORD_LENGTH;

  async function handleLoginRequest(userLogin) {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
      const json = await response.json();
      console.log(json);
      if (json.message) {
        return toggleModalStatus();
      }

      if (json) {
        setUser(json);
        localStorage.setItem('user', JSON.stringify(json));
        navegate('/customer/products');
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const loginInfos = inputs;
    handleLoginRequest(loginInfos);
  }
  function handleRegisterBtn() {
    navegate('/register');
  }
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="flex px-4 gap-2 mt-14 flex-col">
        <img
          className="w-24 object-cover h-24 rounded-full"
          src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="google logo"
        />
        <h1>App de delivery</h1>
      </div>
      <div className="bg-zinc-200 rounded-lg p-4 h-[18rem]">
        <form
          onSubmit={ handleSubmit }
          className="flex flex-col gap-4"
        >
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
              placeholder="Email"
              data-testid="common_login__input-email"
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
              data-testid="common_login__input-password"
            />
          </label>
          <button
            disabled={ isLoginInfosValid || isModalOpen }
            className="loginBtn loginBtn2 loginBtn3"
            type="submit"
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            onClick={ handleRegisterBtn }
            disabled={ isModalOpen }
            className="toRegisterBtn"
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho Conta
          </button>
        </form>
      </div>
      {isModalOpen && (
        <AlertModal
          message="Erro: Usuario nao encontrado"
          dataTestId="common_login__element-invalid-email"
          toggleModalStatus={ toggleModalStatus }
        />
      )}
    </div>
  );
}
