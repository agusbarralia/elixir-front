/* eslint-disable react/prop-types */
import ProductCard from './ProductCard'

function ProductList({title,products}) {

  return (
    <section className="p-4 bg-white">
          <h2 className="text-2xl font-bold text-center mb-4">
            {title}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.productId} 
                product={product}
            />
            ))}

          </div>

        </section>
  )
}

export default ProductList