/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts } from '../redux/productSlice';

function ProductList({ title }) {
  const dispatch = useDispatch();

  // Obtener productos del store
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts()); // Cargar productos si no están en el store
    }
  }, [dispatch, products]);

  // Ordenar productos por precio y seleccionar los 4 más baratos
  const cheapestProducts = [...products]
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {title}
      </h2>

      {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cheapestProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {cheapestProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600 mt-4">No hay productos disponibles.</p>
      )}
    </section>
  );
}

export default ProductList;
