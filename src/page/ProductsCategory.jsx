import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';

function ProductsCategory() {
  const { category } = useParams();

  const products = [
    { id: 1, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, category:"vinos"},
    { id: 2, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, category:"vinos"},
    { id: 3, image: '/trumpeter.png', title: 'Cerveza Recomendado', price: 1500, category:"cervezas"},
    { id: 4, image: '/trumpeter.png', title: 'Licor Recomendado', price: 1500, category:"licores"},
    { id: 5, image: '/trumpeter.png', title: 'Vodka Recomendado', price: 1500, category:"vodkas"},
    { id: 6, image: '/trumpeter.png', title: 'Vodka Recomendado', price: 1500, category:"vodkas"}
  ];

  const filteredProducts = products.filter(product => product.category === category);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  return (
    <div>
      <h2 className='text-4xl mb-6'>{capitalizeFirstLetter(category)}</h2>
      
      <div className='flex'>
      <Filters />
        
        <section className="flex-grow p-4 bg-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
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
}

export default ProductsCategory;
