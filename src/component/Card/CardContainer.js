import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

function CardContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/get-all-products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, [  ]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-around" }}>
      {products.map((product, index) => (
        <Card product={product} index={index} key={product._id} />
      ))}
    </div>
  );
}

export default CardContainer;
