import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

function ProductsCategory() {
  const { category } = useParams();
  //const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  // Nuevo estado para los productos filtrados
  const dispatch = useDispatch()
  const {items: products,loading,error} = useSelector((state) => state.products)
  

  useEffect(()=>{
    dispatch(fetchProducts(category))
  },[dispatch,category])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  if(loading) return <p>Cargando...</p>
  if(error) return <p>Error al cargar los productos: {error}</p>
  
  return (
    <div>
      <h2 className='text-4xl mb-6 text-center font-bold text-gray-800'>
        {capitalizeFirstLetter(category)}
      </h2>      
      <div className='flex'>
        <Filters products={products} setFilteredProducts={setFilteredProducts} />
        
        <section className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
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
