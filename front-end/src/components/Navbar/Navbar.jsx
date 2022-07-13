import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  return (
    <nav className='flex  h-20 bg-black w-full'>
      <Link
        className='navProducts flex'
        to='/'
        data-testid='customer_products__element-navbar-link-products'
      >
        produtos
      </Link>
      <Link
        className='navOrders flex flex-1'
        to='/'
        data-testid='customer_products__element-navbar-link-orders'
      >
        meus produtos
      </Link>
      <Link
        className='navUser flex'
        to='/'
        data-testid='customer_products__element-navbar-user-full-name'
      >
        bruno fay
      </Link>
      <Link
        className='navLogout'
        to='/'
        data-testid='customer_products__element-navbar-link-logout'
      >
        sair
      </Link>
    </nav>
  )
}
