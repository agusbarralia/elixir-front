//import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white">
      <div className="text-xl font-bold"><a href="/">VinoMarket</a></div>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-400">Vinos</a>
        <a href="#" className="hover:text-gray-400">Cervezas</a>
        <a href="#" className="hover:text-gray-400">Licores</a>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="px-2 py-1 rounded-md"
          placeholder="Buscar..."
        />
        <button className="text-lg">🛒</button>
      </div>
    </nav>
  );
};

export default Navbar;
