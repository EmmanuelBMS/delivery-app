import React from 'react';
/* import { useParams } from 'react-router-dom'; */
import Navbar from '../../components/Navbar/Navbar';

const DATA_TESTID_ID = 'customer_order_details__element-order-details-label-order-id';
export default function OrderDetail() {
  const api = [{
    pedidoId: '0001',
    vendedor: 'fulana pereira',
    dataPedido: new Date(Date.now()),
    pedidoStatus: 'pendente',
    totalPedido: 20,
  }];
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
  /* const { orderId } = useParams(); */
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <main className="w-[80vw]">
        <div className="mt-10">
          {api.map((orderInfo) => (
            <div className="flex justify-between" key={ orderInfo.pedidoId }>
              <div>
                <strong>PEDIDO</strong>
                {' '}
                <strong
                  data-testid={ DATA_TESTID_ID }
                >
                  {orderInfo.pedidoId}
                </strong>
              </div>
              <div>
                <span className="tracking-wider">P.Vend:</span>
                {' '}
                <span>{orderInfo.vendedor}</span>
              </div>
              <strong>{formatDate(orderInfo.dataPedido)}</strong>
              <span>{orderInfo.pedidoStatus}</span>
              <button type="button">MARCAR COMO ENTREGUE</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
