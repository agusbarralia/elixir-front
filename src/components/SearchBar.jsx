import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener productos desde el store
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  // Cargar productos al montar el componente si no están disponibles
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Filtrar productos según el término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  // Manejar la selección de un producto
  const handleProductClick = (product) => {
    navigate(`/product/${product.productId}`);
    setSearchTerm(''); // Limpiar el término de búsqueda
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="px-2 py-1 rounded-md border border-gray-300 text-black"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Mostrar mensaje de carga o error */}
      {loading && <p className="text-gray-600">Cargando productos...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Mostrar productos filtrados */}
      {filteredProducts.length > 0 && !loading && !error && (
        <div className="absolute left-0 right-0 bg-white shadow-lg z-10">
          {filteredProducts.map((product) => {
            const imageType = 'image/png'; // Cambia este valor si el formato de la imagen es distinto
            const image = product.imagesList[0]?.imageData || '/placeholder.jpg';
            const imageUrl = imageType ? `data:${imageType};base64,${image}` : image;

            // Calcular el precio con descuento
            const discount = product.discount || 0;
            const discountedPrice = discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;

            return (
              <div
                key={product.productId}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleProductClick(product)}
              >
                <img src={imageUrl} alt={product.name} className="w-10 h-10 mr-2" />
                <div className="text-black">
                  <p className="font-bold">{product.name}</p>
                  {discount > 0 ? (
                    <div className="flex items-center">
                      <p className="text-gray-600 line-through mr-2">${product.price.toFixed(2)}</p>
                      <p className="text-red-600 font-bold">${discountedPrice}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
