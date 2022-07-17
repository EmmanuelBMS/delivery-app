import React from 'react';
import './checkout.css';
import Navbar from '../../components/Navbar/Navbar';
import TableCart from '../../components/TableCart/TableCart';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

export default function Checkout() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <span className="text-xl font-medium">Finalizar Pedido</span>
        <div className="main-content-table">
          <TableCart />
        </div>
        <span className="text-xl font-medium">Detalhes e Endereço para Entrega</span>
        <div className="main-content-form">
          <CheckoutForm />
        </div>
      </main>
    </div>
  );
}
