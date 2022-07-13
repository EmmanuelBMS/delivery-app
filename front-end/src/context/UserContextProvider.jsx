import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const userContext = createContext({});
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  async function requestTokenValidate(token) {
    try {
      const response = await fetch('http://localhost:3001/login/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      });
      const json = await response.json();
      console.log(json);
      if (!json) {
        navigate('/login');
      }
    } catch (error) {
      toggleModalStatus();
    }
  }
  async function getUserToLocalStorage() {
    const userLocalStorage = localStorage.getItem('user');
    const token = { token: userLocalStorage.token };
    await requestTokenValidate(token);
    setUser(userLocalStorage);
  }

  function removeUserToLocalStorage() {
    localStorage.removeItem('user');
    setUser({});
  }
  const valueToProvide = {
    user,
    setUser,
    getUserToLocalStorage,
    removeUserToLocalStorage,
  };
  return (
    <userContext.Provider value={ valueToProvide }>
      {children}
    </userContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
