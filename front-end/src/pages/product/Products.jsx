import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Plus, Minus } from 'phosphor-react'
import './products.css'

const api = [{
  id: 1,
  name: 'skol',
  price: 6.20,
  urlPrice: 'https://cdn.dooca.store/8177/products/cerveja-artesanal-farrapos-pilsen-sem-gluten-600-ml.jpg?v=1644513346'
}, {
  id: 2,
  name: 'coca-cola',
  price: 3.20,
  urlPrice: 'https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/9/9/999296_2.jpg'
}]

export default function Products() {
  const changeDotToCommaOfPrice = (price) => price.toString().replace('.', ',')
  return (
    <div>
      <Navbar />
      <main className='flex py-6 gap-6 px-14'>
        {
          api.map((item) => (
            <div
              className="productCard"
              key={item.id}>
              <span
                data-testid={`customer_products__element-card-price-${item.id}`}
                className='bg-blue-200 py-1 px-2 rounded relative left-2 top-1 text-xl font-extrabold'
              >
                R$ {changeDotToCommaOfPrice(item.price)}
              </span>
              <img
                data-testid={`customer_products__element-card-price-${item.id}`}
                src={item.urlPrice}
              />
              <div className='flex flex-col bg-blue-100 py-2 items-center'>
                <span
                  data-testid={`customer_products__element-card-title-${item.id}`}
                >
                  {item.name}
                </span>
                <div className='flex rounded border bg-[#256B52] px-2 mb-3'>
                  <button
                    data-testid={`customer_products__button-card-rm-item-${item.id}`}
                    className='flex justify-center items-center'
                    type='button'
                  >
                    <Minus
                      className='mr-2'
                      size={18}
                      color={"white"}
                    />
                  </button>

                  <span
                    data-testid={`customer_products__input-card-quantity-${item.id}`}
                    className=' bg-white text-zinc-600 px-3'>
                    {1}
                  </span>
                  <button
                    data-testid={`customer_products__button-card-add-item-${item.id}`}
                    className='flex justify-center items-center'
                    type='button'
                  >
                    <Plus
                      className='ml-2'
                      size={20}
                      color={"white"}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}
