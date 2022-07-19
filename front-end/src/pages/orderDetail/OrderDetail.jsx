import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [order, setOrder] = useState(api);
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
  const { orderId } = useParams();
  const requestApi = async () => {
    try {
      const response = await fetch(`http://localhost:3001/customers/orders/${orderId}`, {
        method: 'GET',
      });
      const json = await response.json();
      if (json.message) {
        console.log(json.message);
      }
      setOrder(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <main className="w-[80vw]">
        <div className="mt-10">
          {order.map((orderInfo) => (
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
