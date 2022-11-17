import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AllUsersContext = createContext({});
export default function UserContextProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);

  async function requestAllUsers(user) {
    try {
      const response = await fetch('http://localhost:3001/register/sellers', {
        method: 'GET',
        headers: {
          Authorization: `${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.message) console.log(json.message);
      console.log(json);
      setAllUsers(json);
    } catch (error) {
      console.log(error);
    }
  }

  const valueToProvide = useMemo(() => ({
    allUsers,
    setAllUsers,
    requestAllUsers,
  }), [allUsers, setAllUsers, requestAllUsers]);

  return (
    <AllUsersContext.Provider value={ valueToProvide }>
      {children}
    </AllUsersContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
