import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

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
  return (
    <div>
      <Navbar />
      <main>
        {
          api.map((item) => (
            <div>
              <span></span>
              <img />
              <div>
                <button></button>
                { }
                <button></button>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}
