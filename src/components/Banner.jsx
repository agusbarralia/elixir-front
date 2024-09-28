//import React from 'react';

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{
        backgroundImage: "url('/wine banner 2.jpg')",
        backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el espacio
        backgroundPosition: 'center', // Mantiene la imagen centrada
        backgroundRepeat: 'no-repeat' // Evita que la imagen se repita
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Vinos Premium</h2>
          <p className="mt-2">¡Descubre nuestra selección especial!</p>
          <button className="mt-4 px-4 py-2 bg-red-600 rounded">Comprar Ahora</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
