import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './order.css';

const api = [{
  pedidoId: '0001',
  pedidoStatus: 'pendente',
  totalPedido: 20,
  dataPedido: new Date(Date.now()),
}, {
  pedidoId: '0002',
  pedidoStatus: 'preparando',
  totalPedido: 20,
  dataPedido: new Date(Date.now()),
}, {
  pedidoId: '0003',
  pedidoStatus: 'entregue',
  totalPedido: 20,
  dataPedido: new Date(Date.now()),
}];
/* funçoes para formatar a data no formato dd/mm/yyyy */
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

// 👇️ 24/10/2021 (mm/dd/yyyy)
console.log(formatDate(new Date(Date.now())));

export default function Order() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-wrap gap-10 items-center justify-center">
        {api.map(({ dataPedido, pedidoId, pedidoStatus, totalPedido }) => (
          <Link
            to={ `${pedidoId}` }
            className="orderCard"
            key={ pedidoId }
          >
            <div
              className="flex flex-col bg-white p-8 my-auto"
            >
              <span className="text-sm">pedido</span>
              <span
                data-testid={ `customer_orders__element-order-id-${pedidoId}` }
              >
                {pedidoId}
              </span>
            </div>
            <div className={ `statusOrderContainer statusOrder-${pedidoStatus} ` }>
              <strong
                data-testid={ `customer_orders__element-delivery-status-${pedidoId}` }
              >
                {pedidoStatus}
              </strong>
            </div>
            <div
              className="flex flex-col items-center py-1 justify-between"
            >
              <span
                className="bg-blue-200 px-2 rounded"
                data-testid={ `customer_orders__element-order-date-${pedidoId}` }
              >
                {formatDate(dataPedido)}
              </span>
              <div className="bg-blue-200 px-6 rounded">
                R$
                {' '}
                <span
                  data-testid={ `customer_orders__element-card-price-${pedidoId}` }
                >
                  {totalPedido}
                </span>
              </div>
            </div>

          </Link>
        ))}
      </main>
    </div>
  );
}
