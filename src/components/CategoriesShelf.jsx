import React from 'react'
import { Link } from "react-router-dom";

function CategoriesShelf() {
  return (
        <section className='m-20'>
          <h2 className="text-2xl font-bold text-center mb-10">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2 md:col-span-2 h-64">
              <Link to="/products/vinos">
                <img
                  src="/categoriaVino.png"
                  alt="Vinos Tintos"
                  className="w-full h-full object-cover rounded-md"
                />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  Vinos
                </h3>
              </Link>
            </div>

            <div className="relative col-span-2 md:col-span-1 h-64">
              <Link to="/products/licores">
                <img
                  src="/categoriaLicores.jpg"
                  alt="Licores"
                  className="w-full h-full object-cover rounded-md"
                />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  Licores
                </h3>
              </Link>
            </div>

            <div className="relative col-span-1 md:col-span-1 row-span-2 h-full">
              <Link to="/products/cervezas">
                <img
                  src="/beer2.jpg"
                  alt="cervezas"
                  className="w-full h-full object-cover rounded-md"
                />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  Cervezas
                </h3>
              </Link>
            </div>

            <div className="relative h-64">
              <Link to="/products/champan">
                <img
                  src="/categoriaChampan.jpg"
                  alt="Champan"
                  className="w-full h-full object-cover rounded-md"
                />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  Champan
                </h3>
              </Link>
            </div>

            <div className="relative col-span-2 md:col-span-2 h-64">
              <Link to="/products/vodkas">
                <img
                  src="/categoriaVodka.jpg"
                  alt="Vodka"
                  className="w-full h-full object-cover rounded-md"
                />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  Vodka
                </h3>
              </Link>
            </div>
          </div>
        </section>

  )
}

export default CategoriesShelf