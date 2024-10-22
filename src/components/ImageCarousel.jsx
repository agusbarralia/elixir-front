import React, { useState } from 'react';

const ImageCarousel = ({ images, imageType = 'image/png' }) => {
  // Formatea las imágenes en base64 con el tipo adecuado o muestra el placeholder si no hay imágenes
  const formatImage = (image) => `data:${imageType};base64,${image}`;
  
  // Si no hay imágenes, usar el placeholder
  const defaultImage = '/placeholder.jpg';
  const imageList = images.length > 0 ? images : [defaultImage];

  // Estado para la imagen actual, iniciando con la primera
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images.length > 0 ? formatImage(imageList[currentIndex]) : defaultImage;

  // Maneja el clic en las miniaturas
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // Navegar a la imagen anterior
  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Navegar a la siguiente imagen
  const handleNextClick = () => {
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Imagen principal con flechas de navegación */}
      <div className="relative w-full max-w-lg h-[550px] overflow-hidden mb-4">
        {/* Flecha izquierda */}
        <button
          onClick={handlePreviousClick}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition ${
            currentIndex === 0 ? 'invisible' : ''
          }`}
          disabled={currentIndex === 0}
        >
          ❮
        </button>

        {/* Imagen principal */}
        <img
          src={currentImage}
          alt="Producto"
          className="w-full h-full object-contain"
        />

        {/* Flecha derecha */}
        <button
          onClick={handleNextClick}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition ${
            currentIndex === imageList.length - 1 ? 'invisible' : ''
          }`}
          disabled={currentIndex === imageList.length - 1}
        >
          ❯
        </button>
      </div>

      {/* Carrusel de miniaturas */}
      <div className="flex overflow-x-auto space-x-2 py-2">
        {imageList.map((image, index) => (
          <img
            key={index}
            src={images.length > 0 ? formatImage(image) : defaultImage}
            alt={`Thumbnail ${index + 1}`}
            className={`w-28 h-28 object-contain cursor-pointer border-2 ${
              currentIndex === index ? 'border-gray-300' : 'border-transparent'
            } hover:border-gray-300 transition duration-200`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
