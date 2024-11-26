import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContent = () => {
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: "url('/banner_main.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-right">
        <div className={`text-right mr-20 p-20 text-white transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {/* Contenedor relativo para el logo y el botón */}
          <div className="relative inline-block">
            {/* Imagen del logo */}
            <img src="/elixir_logo_eslogan.png" alt="Elixir Logo" className="w-128 animate-pulse" />
            <button 
              onClick={handleScrollToContent} 
              className="absolute left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 bg-rose-950 rounded hover:bg-red-700 transition duration-300 transform hover:scale-105"
              style={{ top: '100%' }}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
