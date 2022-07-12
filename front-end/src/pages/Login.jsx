import React, { useState } from 'react';
import AlertModal from '../components/AlertModal/AlertModal';
import useModal from '../hooks/useModal';
import './login.css';

const MIN_PASSWORD_LENGTH = 6;
export default function Login() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [isModalOpen, toggleModalStatus] = useModal();
  const emailRegex = /\S+@\S+\.\S+/;
  const isLoginInfosValid = !emailRegex.test(inputs.email)
    || inputs.password.length < MIN_PASSWORD_LENGTH;
  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
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

      if (json) {
        console.log(json);
        localStorage.setItem('user', json);
        /*  setUserRole(response.data.role);
          navegate('/project'); */
      }
    } catch (error) {
      toggleModalStatus();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const loginInfos = inputs;
    handleLoginRequest(loginInfos);
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
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label
            className="flex flex-col"
            htmlFor="emailInput"
          >
            Email
            <input
              className="border rounded focus:outline-green-500 p-1 outline-transparent"
              onChange={handleChange}
              id="emailInput"
              name="email"
              value={inputs.email}
              type="text"
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
              onChange={handleChange}
              id="passwordInput"
              name="password"
              value={inputs.password}
              type="password"
              placeholder="Senha"
              data-testid="common_login__input-password"
            />
          </label>
          <button
            disabled={isLoginInfosValid || isModalOpen}
            className="loginBtn"
            type="submit"
            data-testid="common_login__button-login"
          >
            Login
          </button>
          <button
            disabled={isModalOpen}
            className="registerBtn"
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho Conta
          </button>
        </form>
      </div>
      {isModalOpen && (<AlertModal toggleModalStatus={toggleModalStatus} />)}
    </div>
  );
}
