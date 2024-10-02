import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]); // Imagen por defecto

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Imagen principal */}
      <div className="w-full max-w-lg h-[550px] overflow-hidden mb-4"> {/* Contenedor fijo para la imagen */}
        <img
          src={currentImage}
          alt="Producto"
          className="w-full h-full object-cover" // Asegurarse de que la imagen llena el contenedor
        />
      </div>

      {/* Carrusel de miniaturas */}
      <div className="flex overflow-x-auto space-x-2 py-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-28 h-28 object-cover cursor-pointer border-2 border-transparent hover:border-gray-300 transition duration-200"
            onClick={() => handleThumbnailClick(image)}
            style={{ borderColor: currentImage === image ? 'gray' : 'transparent' }} // Resaltar la imagen seleccionada
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
