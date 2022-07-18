import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const userContext = createContext({});
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  async function requestTokenValidate() {
    try {
      if (user.token) {
        const response = await fetch('http://localhost:3001/login/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: user.token }),
        });
        const json = await response.json();
        if (json.message) {
          navigate('/login');
        }
      }
    } catch (error) {
      toggleModalStatus();
    }
  }

  function removeUserToLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('carrinho');
    setUser({});
  }

  const valueToProvide = useMemo(() => ({
    user,
    setUser,
    removeUserToLocalStorage,
    requestTokenValidate,
  }), [user,
    setUser,
    removeUserToLocalStorage,
    requestTokenValidate]);

  return (
    <userContext.Provider value={ valueToProvide }>
      {children}
    </userContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
