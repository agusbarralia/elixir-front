//import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();  // Inicializa el hook para la navegación

  const handleCartClick = () => {
    navigate('/cart');  // Navega a la ruta del carrito
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white">
      <div className="text-xl font-bold"><a href="/">VinoMarket</a></div>
      <div className="flex space-x-4">
        <a href="/products/vinos" className="hover:text-gray-400">Vinos</a>
        <a href="/products/cervezas" className="hover:text-gray-400">Cervezas</a>
        <a href="/products/licores" className="hover:text-gray-400">Licores</a>
        <a href="/products/vodkas" className="hove:text-gray-400">Vodkas</a>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="px-2 py-1 rounded-md"
          placeholder="Buscar..."
        />
      <button className="text-lg" onClick={handleCartClick}>🛒</button>
      <a href="/login" className="hove:text-gray-400">Iniciar Sesion</a>

      </div>
    </nav>
  );
};

export default Navbar;
