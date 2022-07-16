import React /* { useContext } */ from 'react';
import './checkout.css';
import CheckoutTable from '../../components/checkoutTable/CheckoutTable';
import Navbar from '../../components/Navbar/Navbar';
// import { productsContext } from '../../context/ProductsContextProvider';

export default function Checkout() {
  // const {
  //   productsApi,
  //   totalItemsPrice,
  //   getProductsToLocalStorage,
  //   handleProductsRequest,
  // } = useContext(productsContext);

  return (
    <div>
      <Navbar />
      <main className="flex py-6 items-center justify-center gap-6 flex-wrap">
        <CheckoutTable />
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
