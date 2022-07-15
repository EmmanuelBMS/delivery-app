import React /* { useContext } */ from 'react';
import './checkout.css';
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
        <div>
          <h3>Finalizar Pedido</h3>
          <table>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sun-total</th>
              <th>Remover Item</th>
            </tr>
            <tr>
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
