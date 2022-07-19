import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { userContext } from '../../context/UserContextProvider';

export default function Navbar() {
  const { user, removeUserToLocalStorage } = useContext(userContext);

  return (
    <nav className="flex  h-20 bg-black w-full">
      <Link
        className="navProducts flex"
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        produtos
      </Link>
      <Link
        className="navOrders flex flex-1"
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        meus pedidos
      </Link>
      <Link
        className="navUser flex"
        to="/"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user.name ?? ''}
      </Link>
      <Link
        onClick={ removeUserToLocalStorage }
        className="navLogout"
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
      >
        sair
      </Link>
    </nav>
  );
}
