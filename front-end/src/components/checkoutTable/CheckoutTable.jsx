import React from 'react';
import './checkoutTable.css';

export default function CheckoutTable() {
  return (
    <div>
      <h3>Finalizar Pedido</h3>
      <table className="checkoutTable">
        <tr className="headerTable">
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sun-total</th>
          <th>Remover Item</th>
        </tr>
        <tr className="bodyTable">
          <td>3</td>
          <td>skol</td>
          <td>12</td>
          <td>2,00</td>
          <td>24,00</td>
          <td>REMOVER</td>
        </tr>
      </table>
      <h2>Total: R$ 00,00</h2>
    </div>
  );
}
