import React from 'react';
import './checkout.css';
import Navbar from '../../components/Navbar/Navbar';
import TableCart from '../../components/TableCart/TableCart';

export default function Checkout() {
  return (
    <div>
      <Navbar />
      <main>
        <h3>Finalizar Pedido</h3>
        <TableCart />
        <div>
          <h3>Detalhes e Endereço para Entrega</h3>
          <input type="select" />
          <input type="text" />
          <input type="number" />
          <button type="button"> FINALIZAR PEDIDO </button>
        </div>
      </main>
    </div>
  );
}
