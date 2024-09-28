import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
const Home = () => {

const products = [
        {
          id: 1,
          image: '/trumpeter.png',
          title: 'Vino Recomendado',
          price: 1500,
        },
        // Puedes agregar más productos aquí
      ];
    
  return (
    <div>
      {/* Barra de Navegación */}

      {/* Banner o Carrusel */}
      <Banner></Banner>

      {/* Sección de Categorías */}
      <section className="p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Explora por Categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <img
              src="/img/vino.jpg"
              alt="Vinos Tintos"
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-2">Vinos Tintos</h3>
          </div>
          <div className="text-center">
            <img
              src="/img/cerveza.jpg"
              alt="Cervezas"
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-2">Cervezas</h3>
          </div>
          <div className="text-center">
            <img
              src="/img/licor.jpg"
              alt="Licores"
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-2">Licores</h3>
          </div>
          <div className="text-center">
            <img
              src="/img/vodka.jpg"
              alt="Vodka"
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-2">Vodka</h3>
          </div>
        </div>
      </section>

      {/* Sección de Productos Recomendados */}
      <section className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-4">Productos Recomendados</h2>
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
        
          {/* Repite más tarjetas de productos aquí */}
        </div>
      </section>

      
    </div>
  );
};

export default Home;
