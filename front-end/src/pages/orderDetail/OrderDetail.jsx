import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const DATA_TESTID_ID = 'customer_order_details__element-order-details-label-order-id';
export default function OrderDetail() {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function changeDotToCommaOfPrice(price) { return price.toString().replace('.', ','); }

  function formatDate(date) {
    const dateFormatedUTC = new Date(date);
    return [
      padTo2Digits(dateFormatedUTC.getDate()),
      padTo2Digits(dateFormatedUTC.getMonth() + 1),
      dateFormatedUTC.getFullYear(),
    ].join('/');
  }
  const { orderId } = useParams();

  async function getOnlyProducts(array) {
    const productObj = array.map((prod) => ({
      price: prod.price,
      quantity: prod.SaleProduct.quantity }));

    console.log(productObj);
    setProduct(productObj);
  }

  async function requestApi() {
    try {
      const response = await fetch(`http://localhost:3001/sales/${orderId}`, {
        method: 'GET',
      });
      const json = await response.json();
      await getOnlyProducts(json.products);
      if (json.message) {
        console.log(json.message);
      }
      setOrder(Array(json));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    requestApi();
    getOnlyProducts();
  }, []);

  function totalPrice() {
    return product.reduce((acc, curr) => {
      let t = acc;
      t += (Number(curr.price) * Number(curr.quantity));
      return t;
    }, 0);
  }
  console.log(totalPrice());
  console.log(product);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <main className="w-[80vw]">
        <div className="mt-10">
          {order.map((orderInfo) => (
            <div className="flex justify-between" key={ orderInfo.id }>
              <div>
                <strong>PEDIDO</strong>
                {' '}
                <strong
                  data-testid={ DATA_TESTID_ID }
                >
                  {orderInfo.id}
                </strong>
              </div>
              <div>
                <span className="tracking-wider">P.Vend:</span>
                {' '}
                <span
                  data-testid={ `
                customer_order_details__element-order-details-label-seller-name` }
                >
                  {orderInfo.seller.name}

                </span>
              </div>
              <strong
                data-testid={ `
              customer_order_details__element-order-details-label-order-date` }
              >
                {formatDate(orderInfo.saleDate)}
              </strong>
              <span
                data-testid={ `
               customer_order_details__element-order-details-label-delivery-status` }
              >
                {orderInfo.status}
              </span>
              <button
                data-testid={ `
               customer_order_details__button-delivery-check` }
                type="button"
              >
                MARCAR COMO ENTREGUE

              </button>
            </div>
          ))}
        </div>
        <div>
          {order.map(({ products }, i) => (
            <div
              key={ i }
              className="flex flex-col"
            >
              {products.map((p, ind) => (
                <div className="flex gap-2" key={ p.id }>
                  <span
                    data-testid={ `
                    customer_order_details__element-order-table-item-number-${ind}` }
                  >
                    {ind + 1}
                  </span>
                  <span
                    data-testid={ `
                    customer_order_details__element-order-table-name-${ind}` }
                  >
                    {p.name}
                  </span>
                  <span
                    data-testid={ `
                    customer_order_details__element-order-table-sub-total-${ind}` }
                  >

                    {p.price}
                  </span>
                  <span
                    data-testid={ `
                    customer_order_details__element-order-table-quantity-${ind}` }
                  >

                    {p.SaleProduct.quantity}
                  </span>
                  <span
                    data-testid={ `
                    customer_order_details__element-order-total-price-${ind}` }
                  >

                    { (Number(p.price) * Number(p.SaleProduct.quantity)).toFixed(2) }
                  </span>
                </div>
              ))}
            </div>))}
          <div>
            Total: R$
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              {` ${changeDotToCommaOfPrice(totalPrice()) || 0}`}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
