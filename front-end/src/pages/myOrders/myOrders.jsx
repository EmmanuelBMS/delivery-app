import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './myOrders.css';

import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';
import { productsContext } from '../../context/ProductsContextProvider';

export default function Order() {
  const { requestTokenValidate } = useContext(userContext);
  const { changeDotToCommaOfPrice } = useContext(productsContext);
  const [user] = useState(JSON.parse(localStorage.getItem('user')));

  /* funçoes para formatar a data no formato dd/mm/yyyy */
  const [salesReq, setSalesReq] = useState([]);
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    const dateFormatedUTC = new Date(date);
    return [
      padTo2Digits(dateFormatedUTC.getDate()),
      padTo2Digits(dateFormatedUTC.getMonth() + 1),
      dateFormatedUTC.getFullYear(),
    ].join('/');
  }

  // FIZ A FUNÇÂO AQUI PARA PEGAR TODAS OS SALES
  async function SalesReq() {
    const { id, role } = user;

    try {
      const response = await fetch(`http://localhost:3001/sales/search?id=${id}&role=${role}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json.message) {
        console.log(json.message);
      }
      setSalesReq(json);
    } catch (error) {
      console.log(error);
    }
  }

  // 👇️ 24/10/2021 (mm/dd/yyyy)
  // console.log(formatDate(new Date(Date.now())));

  useEffect(() => {
    requestTokenValidate();
    SalesReq();
  }, []);

  console.log(salesReq);

  return (
    <div>
      <Navbar />
      <main className="flex flex-wrap gap-10 items-center justify-center">
        {salesReq.map(({ saleDate, id, status, totalPrice }) => (
          <Link
            to={ `${id}` }
            className="orderCard"
            key={ id }
          >
            <div
              className="flex flex-col bg-white p-8 my-auto"
            >
              <span className="text-sm">pedido</span>
              <span
                data-testid={ `customer_orders__element-order-id-${id}` }
              >
                {id}
              </span>
            </div>
            <div className={ `statusOrderContainer statusOrder-${status} ` }>
              <strong
                data-testid={ `customer_orders__element-delivery-status-${id}` }
              >
                {status}
              </strong>
            </div>
            <div
              className="flex flex-col items-center py-1 justify-between"
            >
              <span
                className="bg-blue-200 px-2 rounded"
                data-testid={ `customer_orders__element-order-date-${id}` }
              >
                {formatDate(saleDate)}
              </span>
              <div className="bg-blue-200 px-6 rounded">
                R$
                {' '}
                <span
                  data-testid={ `customer_orders__element-card-price-${id}` }
                >
                  {changeDotToCommaOfPrice(totalPrice)}
                </span>
              </div>
            </div>

          </Link>
        ))}
      </main>
    </div>
  );
}
