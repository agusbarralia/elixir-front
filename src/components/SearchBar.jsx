import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hook para la navegación
  const navigate = useNavigate();

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');
        const data = await response.json();
        setProducts(data);
        console.log("Productos recibidos:", data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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

  // Función para manejar la selección de un producto y limpiar el searchTerm
  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
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
      {filteredProducts.length > 0 && (
        <div className="absolute left-0 right-0 bg-white shadow-lg z-10">
          {filteredProducts.map((product) => {
            // Usa el mismo formato que en el componente ProductCard
            const imageType = "image/png"; // Cambia este valor si el formato de la imagen es distinto
            const image = product.imagesList[0]?.imageData || "/placeholder.jpg";
            const imageUrl = imageType ? `data:${imageType};base64,${image}` : image;

            // Calcular el precio con descuento
            const discount = product.discount || 0; // Si no tiene descuento, se toma como 0.
            const discountedPrice = discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;

            return (
              <div
                key={product.id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleProductClick(product)} // Llamar a la función handleProductClick
              >
                <img src={imageUrl} alt={product.name} className="w-10 h-10 mr-2" />
                <div className="text-black">
                  <p className="font-bold">{product.name}</p>
                  
                  {/* Mostrar precios con y sin descuento */}
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
