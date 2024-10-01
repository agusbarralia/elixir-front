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
        backgroundImage: "url('/banner_7_r.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
        <div className={`text-center text-white transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-6xl font-bold animate-bounce">Elixir</h2>
          <p className="mt-2 text-lg font-semibold animate-pulse">¡Uno se toma, el otro se saborea!</p>
          <button 
            onClick={handleScrollToContent} 
            className="mt-4 px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
