import React from 'react'
import ProductCard from './ProductCard'

function ProductList({title}) {
    const products = [
        {
          id: 1,
          image: "/trumpeter.png",
          title: "Vino Recomendado",
          price: 1500,
        },
        {
          id: 2,
          image: "/trumpeter.png",
          title: "Vino Recomendado",
          price: 1500,
        },
      ];
  return (
    <section className="p-4 bg-gray-100">
          <h2 className="text-2xl font-bold text-center mb-4">
            {title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                productId={product.id}
              />
            ))}

          </div>
        </section>
  )
}

export default ProductList