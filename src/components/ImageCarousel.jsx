import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ImageCarousel = () => {
  const imagesList = useSelector((state) => state.products.selectedProduct?.imagesList || []); // Ajustar según la estructura del store
  const imageType = 'image/png'; // Tipo de imagen por defecto
  const images = imagesList?.map((image) => image.imageData) || ["/placeholder.png"];

  const formatImage = (image) => `data:${imageType};base64,${image}`;
  const defaultImage = '/placeholder.jpg';


  const imageList = images.length > 0 ? images : [defaultImage];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images.length > 0 ? formatImage(imageList[currentIndex]) : defaultImage;

  const handleThumbnailClick = (index) => setCurrentIndex(index);
  const handlePreviousClick = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleNextClick = () => currentIndex < imageList.length - 1 && setCurrentIndex(currentIndex + 1);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-lg h-[550px] overflow-hidden mb-4">
        <button
          onClick={handlePreviousClick}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition ${
            currentIndex === 0 ? 'invisible' : ''
          }`}
          disabled={currentIndex === 0}
        >
          ❮
        </button>
        <img src={currentImage} alt="Producto" className="w-full h-full object-contain" />
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
