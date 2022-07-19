import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import './myOrders.css';

import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';
import { useContext } from 'react';


export default function Order() {
  const { requestTokenValidate } = useContext(userContext);
  
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
  
  
  // FIZ A FUNÇÂO AQUI PARA PEGAR TODAS OS SALES
  async function SalesReq() {
    try {
      const response = await fetch('http://localhost:3001/sales');
      const salesReq = await response.json();
      if (salesReq) {
          return salesReq;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // 👇️ 24/10/2021 (mm/dd/yyyy)
  // console.log(formatDate(new Date(Date.now())));
  
  const salesReq = SalesReq()
  // COLOQUEI A FUNÇÂO ESPERANDO O BANCO
  console.log(salesReq);


  useEffect(() => {
    requestTokenValidate();
  }, []);


  return (
    <div>
      <Navbar />
      <main className="flex flex-wrap gap-10 items-center justify-center">
        {salesReq.map(({ dataPedido, pedidoId, pedidoStatus, totalPedido }) => (
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
