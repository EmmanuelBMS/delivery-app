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
    <table className="table-auto borderd-collapse border-spacing-18">
      <thead>
        <tr>
          <th className="border">Item</th>
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
            <td
              className="bg-green-300 rounded-l"
            >
              { item.id }
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${item.id}` }
            >
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
              className="bg-green-700 text-white"
            >
              { `R$${changeDotToCommaOfPrice((+item.price).toFixed(2))}` }
            </td>
            {/* prices transformados em numbers com um + pq vinha como string */}
            <td
              data-testid={
                `customer_checkout__element-order-table-sub-total-${item.id}`
              }
              className="bg-purple-700 text-white"
            >
              { `R$ ${changeDotToCommaOfPrice((+item.count * item.price).toFixed(2))}` }
            </td>
            <button
              type="button"
              onClick={ () => removeItems(item.id) }
              data-testid={ `customer_checkout__element-order-table-remove-${item.id}` }
              className="bg-purple-500 rounded-r text-white p-2"
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
