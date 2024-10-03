import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import React, { useEffect, useState } from "react";


function ProductsCategory() {
  const { category } = useParams();

  /*
  const products = [
    { id: 1, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, category:"vinos"},
    { id: 2, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, category:"vinos"},
    { id: 3, image: '/trumpeter.png', title: 'Cerveza Recomendado', price: 1500, category:"cervezas"},
    { id: 4, image: '/trumpeter.png', title: 'Licor Recomendado', price: 1500, category:"licores"},
    { id: 5, image: '/trumpeter.png', title: 'Vodka Recomendado', price: 1500, category:"vodkas"},
    { id: 6, image: '/trumpeter.png', title: 'Vodka Recomendado', price: 1500, category:"vodkas"}
  ];
*/
  const [products, setProducts] = useState([]);
  const url = `http://localhost:8080/products/category?categoryName=${category}`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, [category]);
  console.log(url);
  console.log(products);

/*
  const filteredProducts = products.filter(product => product.category === category); 
*/

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  return (
    <div>
      <h2 className='text-4xl mb-6'>{capitalizeFirstLetter(category)}</h2>
      
      <div className='flex'>
      <Filters />
        
        <section className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.productId} 
                image={product.imagesList[0]?.imageData} 
                imageType="image/png"
                title={product.name} 
                price={product.price} 
                productId={product.productId} 
              />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}

export default ProductsCategory;
