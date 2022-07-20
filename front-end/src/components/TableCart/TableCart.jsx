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
    localStorage.setItem('carrinho', JSON.stringify(removedProduct));
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
        {productsInCart.map((item, index) => (
          <tr key={ item.id }>
            <td
              className="bg-green-300 rounded-l"
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {item.count}
            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
              className="bg-green-700 text-white"
            >
              {`R$${changeDotToCommaOfPrice((+item.price).toFixed(2))}`}
            </td>
            {/* prices transformados em numbers com um + pq vinha como string */}
            <td
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
              className="bg-purple-700 text-white"
            >
              {`R$ ${changeDotToCommaOfPrice((+item.count * item.price).toFixed(2))}`}
            </td>
            <button
              type="button"
              onClick={ () => removeItems(item.id) }
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              className="bg-purple-500 rounded-r text-white p-2"
            >
              REMOVER
            </button>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          Total: R$
          <td
            data-testid="customer_checkout__element-order-total-price"
          >
            {` ${changeDotToCommaOfPrice(totalItemsPrice().toFixed(2)) || 0}`}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
