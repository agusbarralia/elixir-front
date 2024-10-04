import { useLocation } from 'react-router-dom';
import ProductDescription from "../components/ProductDescription";
import ProductAddToCart from "../components/ProductAddToCart";
import ProductData from "../components/ProductData";
import ImageCarousel from "../components/ImageCarousel"; // Importa el nuevo componente

const ProductDetail = () => {
  const location = useLocation();  // Obtiene la ubicación actual
  const product = location.state?.product;  // Recupera el producto del state

  if (!product) {
    return <p>No se pudo cargar el producto.</p>;  // Muestra un mensaje si no hay producto
  }

  // Lista de imágenes para el carrusel
  const images = product.imagesList?.map(image => image.imageData) || ["/placeholder.png"];

  return (
    <div className= " py-8">

      <div className="max-w-9xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 z-10 mx-4 md:mx-8"> {/* Agregado mx-4 para márgenes a los costados */}
        <div className="flex justify-center bg-gray-50 p-4 rounded-lg shadow-inner">
          {/* Usamos el ImageCarousel aquí */}
          <ImageCarousel images={images} />
        </div>
        <div className="flex flex-col justify-between p-4">
          <ProductDescription 
            title={product.name} 
            brand={product.brand || "Marca desconocida"} 
            description={product.productDescription || "Descripción no disponible."}
          />
          <ProductAddToCart price={`$${product.price}`} />
          <ProductData 
            category={product.categoryName || "Categoria desconocida"}
            subCategory={product.subCategoryName || "Color no especificado"}
            variety={product.varietyName || "Variedad no especificada"}
            sort={product.sort || "Bodega no especificada"}
            size={product.size || "Tamaño no especificado"}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
