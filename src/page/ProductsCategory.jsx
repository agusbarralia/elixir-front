import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategory } from '../redux/productSlice';

function ProductsCategory() {
  const { category } = useParams();
  const dispatch = useDispatch()
  const { categoryItems: products, loading, error } = useSelector((state) => state.products)
  //const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  // Nuevo estado para los productos filtrados


  useEffect(() => {
    dispatch(fetchProductsCategory(category))
  }, [dispatch, category])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar los productos: {error}</p>

  return (
    <div className="mx-auto px-48">
      <h2 className="text-3xl text-center font-semibold text-gray-900 border-b-2 border-rose-950 pb-5 p-5">
        <span className="text-4xl font-bold">{capitalizeFirstLetter(category)}</span>
      </h2>

      <div className="flex"> {/* Cambiamos 'space-x' por 'gap' para mayor control */}

        <Filters
          products={products}
          setFilteredProducts={setFilteredProducts}
          className="w-1/4 p-4 bg-gray-100 shadow-lg rounded-lg" // Reduce el ancho de los filtros
        />

        <section className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> {/* Incrementamos el 'gap' */}
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

