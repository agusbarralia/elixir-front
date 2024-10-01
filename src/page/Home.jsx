import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const Home = () => {
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
    <div>

      <Banner />

      <div id="content" className="p-4">
        <section>
          <h2 className="text-2xl font-bold text-center mb-4">
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

        <section className="p-4 bg-gray-100">
          <h2 className="text-2xl font-bold text-center mb-4">
            Productos Recomendados
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
      </div>
    </div>
  );
};

export default Home;
