/* eslint-disable react/prop-types */
import ProductCard from './ProductCard'

function ProductList({title, products}) {

  // Ordenar productos por precio en orden ascendente y seleccionar los 4 más baratos
  const cheapestProducts = [...products]
    .sort((a, b) => a.price - b.price) // Ordenar por precio ascendente
    .slice(0, 4); // Tomar los primeros 4 productos

  return (
    <section className="p-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">
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

    </section>
  );
}

export default ProductList;
