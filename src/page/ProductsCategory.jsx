import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { useEffect, useState } from "react";

function ProductsCategory() {
  const { category } = useParams();
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
  }, [url]);

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
                  product={product} 
                  key={product.productId} 
                />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductsCategory;
