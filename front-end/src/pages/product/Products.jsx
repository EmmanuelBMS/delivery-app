import React, { useEffect, useState, useContext } from 'react';
import { Plus, Minus } from 'phosphor-react';
import './products.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { userContext } from '../../context/UserContextProvider';

export default function Products() {
  const [products, setProducts] = useState([]);
  async function handleProductsRequest() {
    try {
      const response = await fetch('http://localhost:3001/products');
      const json = await response.json();

      if (json.name) {
        setProducts(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { getUserToLocalStorage } = useContext(userContext);
  useEffect(() => {
    getUserToLocalStorage();
    handleProductsRequest();
  }, [getUserToLocalStorage]);

  const changeDotToCommaOfPrice = (price) => price.toString().replace('.', ',');
  return (
    <div>
      <Navbar />
      <main className="flex py-6 gap-6 px-14">
        {
          products.map((item) => (
            <div
              className="productCard"
              key={ item.id }
            >
              <span
                data-testid={ `customer_products__element-card-price-${item.id}` }
                className="cardPrice"
              >
                R$
                { changeDotToCommaOfPrice(item.price) }
              </span>
              <img
                alt=""
                data-testid={ `customer_products__element-card-price-${item.id}` }
                src={ item.urlPrice }
              />
              <div className="flex flex-col bg-blue-100 py-2 items-center">
                <span
                  data-testid={ `customer_products__element-card-title-${item.id}` }
                >
                  {item.name}
                </span>
                <div className="flex rounded border bg-[#256B52] px-2 mb-3">
                  <button
                    data-testid={ `customer_products__button-card-rm-item-${item.id}` }
                    className="flex justify-center items-center"
                    type="button"
                  >
                    <Minus
                      className="mr-2"
                      size={ 18 }
                      color={ white }
                    />
                  </button>

                  <span
                    data-testid={ `customer_products__input-card-quantity-${item.id}` }
                    className=" bg-white text-zinc-600 px-3"
                  >
                    {1}
                  </span>
                  <button
                    data-testid={ `customer_products__button-card-add-item-${item.id}` }
                    className="flex justify-center items-center"
                    type="button"
                  >
                    <Plus
                      className="ml-2"
                      size={ 20 }
                      color={ white }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
        <Link
          className="checkoutButton"
          data-testid="customer_products__checkout-bottom-value"
          to="/"
        >
          Ver Carrinho:
          <span>
            R$
            {1222}
          </span>
        </Link>
      </main>
    </div>
  );
}
