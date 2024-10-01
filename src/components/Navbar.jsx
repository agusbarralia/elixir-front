import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // Estado para almacenar el timeout
  const [cartTimeoutId, setCartTimeoutId] = useState(null); // Estado para el timeout del carrito

  const handleCartClick = () => {
    navigate('/cart');  // Navega a la ruta del carrito
  };

  const handleCategoryClick = (Categoria) => {
    navigate(`/products/${Categoria.toLowerCase()}`);  // Navega a la ruta del carrito
};

  const handleCheckoutClick = () => {
    navigate('/checkout');  // Navega a la ruta de checkout
  };

  // Simulación de productos en el carrito
  const cartItems = [
    { id: 1, title: 'Bermuda BROOKLYN', price: 45100, quantity: 1 },
    { id: 2, title: 'Remera OVER', price: 22300, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Simulación de categorías y subcategorías
  const categories = [
    {
      title: 'Vinos',
      subcategories: [
        { title: 'Tintos', variants: ['Malbec', 'Cabernet Sauvignon', 'Syrah'] },
        { title: 'Blancos', variants: ['Chardonnay', 'Sauvignon Blanc', 'Riesling'] },
      ],
    },
    {
      title: 'Cervezas',
      subcategories: [
        { title: 'Rubias', variants: ['Lager', 'Pale Ale', 'Blonde Ale'] },
        { title: 'Negras', variants: ['Stout', 'Porter', 'Brown Ale'] },
      ],
    },
    {
      title: 'Licores',
      subcategories: [
        { title: 'Whiskies', variants: ['Escocés', 'Irlandés', 'Americano'] },
        { title: 'Rones', variants: ['Añejo', 'Blanco', 'Oscuro'] },
      ],
    },
    {
      title: 'Vodkas',
      subcategories: [
        { title: 'Saborizados', variants: ['Frutos Rojos', 'Limón', 'Pepino'] },
        { title: 'Clásicos', variants: ['Ruso', 'Polaco'] },
      ],
    }
  ];

  const handleVariantClick = (categoryTitle, subcategoryTitle, variant) => {
    navigate(`/products?category=${categoryTitle}&subcategory=${subcategoryTitle}&variant=${variant}`);
  };

  const handleMouseEnter = (index) => {
    // Limpia cualquier timeout previo
    clearTimeout(timeoutId);
    setActiveCategory(index);
  };

  const handleMouseLeave = () => {
    // Establece un timeout para cerrar el dropdown después de un pequeño retraso
    const id = setTimeout(() => {
      setActiveCategory(null);
    }, 200); // Tiempo en milisegundos
    setTimeoutId(id);
  };

  const handleCartMouseEnter = () => {
    clearTimeout(cartTimeoutId); // Limpiar cualquier timeout previo
    setIsCartHovered(true);
  };

  const handleCartMouseLeave = () => {
    // Establece un timeout para cerrar el dropdown del carrito después de un pequeño retraso
    const id = setTimeout(() => {
      setIsCartHovered(false);
    }, 200); // Tiempo en milisegundos
    setCartTimeoutId(id);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white relative">
      <div className="text-xl font-bold">
        <a href="/">VinoMarket</a>
      </div>
      
      <div className="flex space-x-4 relative">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="relative" 
            onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={handleMouseLeave}
          >
            <button onClick={() => handleCategoryClick(category.title)} className="hover:text-gray-400">{category.title}</button>
            
            {/* Dropdown de subcategorías */}
            {activeCategory === index && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4 z-10">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="mb-1">
                    <h4 className="font-bold">{subcategory.title}</h4>
                    <ul className="ml-4 list-disc">
                      {subcategory.variants.map((variant, varIndex) => (
                        <li 
                          key={varIndex} 
                          className="cursor-pointer hover:text-blue-600" 
                          onClick={() => handleVariantClick(category.title, subcategory.title, variant)}
                        >
                          {variant}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 relative">
        <input
          type="text"
          className="px-2 py-1 rounded-md"
          placeholder="Buscar..."
        />
        
        <div 
          className="relative" 
          onMouseEnter={handleCartMouseEnter} 
          onMouseLeave={handleCartMouseLeave}
        >
          <button className="text-lg" onClick={handleCartClick}>
            🛒
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </button>
          
          {/* Dropdown del carrito */}
          {isCartHovered && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-10">
              <h3 className="font-bold mb-2">Carrito / ${subtotal.toLocaleString()}</h3>
              <ul className="max-h-40 overflow-y-auto mb-2">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between text-sm border-b border-gray-200 py-1">
                    <span>{item.title}</span>
                    <span>${item.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-2 font-semibold">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="mt-4">
                <button 
                  onClick={handleCartClick} 
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Ver Carrito
                </button>
                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 mt-1 transition duration-300"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>

        <a href="/login" className="hover:text-gray-400">Iniciar Sesión</a>
      </div>
    </nav>
  );
};

export default Navbar;
