import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products'); // Cambia la URL según tu backend
        const data = await response.json();
        setProducts(data);
        console.log("Productos recibidos:", data); // Verifica los productos
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

  const handleProductClick = (product) => {
    // Redirigir a la página de detalles del producto
    window.location.href = `/product/${product.id}`; // Ajusta según la estructura de tus rutas
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
          {filteredProducts.map((product) => (
            <div
              key={product.id} // Asegúrate de que product.id sea único
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.imageUrl} alt={product.name} className="w-10 h-10 mr-2" />
              <div className="text-black"> {/* Asegurando que el texto sea negro */}
                <p className="font-bold">{product.name}</p>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
