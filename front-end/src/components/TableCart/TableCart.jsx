import React, { useContext } from 'react';
import { productsContext } from '../../context/ProductsContextProvider';

export default function TableCart() {
  const {
    productsInCart,
    totalItemsPrice,
    setProductsInCart,
  } = useContext(productsContext);

  const changeDotToCommaOfPrice = (price) => price.toString().replace('.', ',');

  const removeItems = (id) => {
    const removedProduct = productsInCart.filter((p) => p.id !== id);
    setProductsInCart(removedProduct);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {productsInCart.map((item) => (
          <tr key={ item.id }>
            <td>{ item.id }</td>
            <td data-testid={ `customer_checkout__element-order-table-name-${item.id}` }>
              { item.name }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${item.id}` }
            >
              { item.count }
            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-unit-price-${item.id}`
              }
            >
              { changeDotToCommaOfPrice((+item.price).toFixed(2)) }
            </td>
            {/* prices transformados em numbers com um + pq vinha como string */}
            <td
              data-testid={
                `customer_checkout__element-order-table-sub-total-${item.id}`
              }
            >
              { changeDotToCommaOfPrice((+item.count * item.price).toFixed(2)) }
            </td>
            <button
              type="button"
              onClick={ () => removeItems(item.id) }
              data-testid={ `customer_checkout__element-order-table-remove-${item.id}` }
            >
              REMOVER
            </button>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td
            data-testid="customer_checkout__element-order-total-price"
          >
            {`Total: R$ ${changeDotToCommaOfPrice(totalItemsPrice().toFixed(2)) || 0}`}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
