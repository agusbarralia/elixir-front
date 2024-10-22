/* eslint-disable react/prop-types */
import ProductCard from './ProductCard';

function ProductList({ title, products }) {
  // Ordenar productos por precio en orden ascendente y seleccionar los 4 más baratos
  const cheapestProducts = [...products]
    .sort((a, b) => a.price - b.price) // Ordenar por precio ascendente
    .slice(0, 4); // Tomar los primeros 4 productos

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cheapestProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
      </div>
      
      {cheapestProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No hay productos disponibles.</p>
      )}
    </section>
  );
}

export default ProductList;
