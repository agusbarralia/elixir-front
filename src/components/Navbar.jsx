import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CartDropdown from './CartDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [cartTimeoutId, setCartTimeoutId] = useState(null);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCategoryClick = (Categoria) => {
    navigate(`/products/${Categoria.toLowerCase()}`);
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const cartItems = [
    { id: 1, title: 'Bermuda BROOKLYN', price: 45100, quantity: 1 },
    { id: 2, title: 'Remera OVER', price: 22300, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
    clearTimeout(timeoutId);
    setActiveCategory(index);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveCategory(null);
    }, 200); // Tiempo en milisegundos
    setTimeoutId(id);
  };

  const handleCartMouseEnter = () => {
    clearTimeout(cartTimeoutId);
    setIsCartHovered(true);
  };

  const handleCartMouseLeave = () => {
    const id = setTimeout(() => {
      setIsCartHovered(false);
    }, 200);
    setCartTimeoutId(id);
  };

  // Obtener el rol del usuario del local storage
  const role = localStorage.getItem('role');

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del local storage
    localStorage.removeItem('role'); // Eliminar el rol (opcional)
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white relative">
      <div className="text-xl font-bold">
        <a href="/">Elixir</a>
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

      <div className="flex items-center space-x-2 relative">
        <input
          type="text"
          className="px-2 py-1 rounded-md"
          placeholder="Buscar..."
        />

        {/* Mostrar el carrito solo si el rol no es ADMIN */}
        {role !== 'ADMIN' ? (
          <CartDropdown 
            cartItems={cartItems} 
            handleCartClick={handleCartClick} 
            handleCartMouseEnter={handleCartMouseEnter} 
            handleCartMouseLeave={handleCartMouseLeave} 
            isCartHovered={isCartHovered} 
            subtotal={subtotal} 
            handleCheckoutClick={handleCheckoutClick}
          />
        ) : (
          <a href="/admin/products" className="hover:text-gray-400">Administración</a>
        )}

        {isLoggedIn ? (
          <button onClick={handleLogout} className="hover:text-gray-400">Cerrar Sesión</button>
        ) : (
          <a href="/login" className="hover:text-gray-400">Iniciar Sesión</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
