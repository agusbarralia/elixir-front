import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearSelectedProduct, fetchProductById } from '../redux/productSlice';
import ProductDescription from "../components/ProductDescription";
import ProductAddToCart from "../components/ProductAddToCart";
import ProductData from "../components/ProductData";
import ImageCarousel from "../components/ImageCarousel";

const ProductDetail = () => {
  
  const { productId } = useParams(); // Obtener el ID del producto desde la URL
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId)); // Obtener el producto al montar el componente
    return () => {
      dispatch(clearSelectedProduct()); // Limpiar el producto al desmontar
    };  
  }, [dispatch, productId]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error}</p>;

  if (!product) {
    return <p>No se pudo cargar el producto.</p>; // Evita errores si no hay datos
  }  
  
  //const images = product.imagesList?.map((image) => image.imageData) || ["/placeholder.png"];

  return (
    <div className="py-8">
      <div className="max-w-9xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 z-10 mx-4 md:mx-8">
        <div className="flex justify-center bg-gray-50 p-4 rounded-lg shadow-inner">
          <ImageCarousel />
        </div>
        <div className="flex flex-col justify-between p-4">
          <ProductDescription 
            title={product.name} 
            brand={product.brand || "Marca desconocida"} 
            description={product.productDescription || "Descripción no disponible."}
          />
          <ProductAddToCart 
            price={product.price} 
            productId={product.productId} 
            productName={product.name} 
            discount={product.discount} 
            stock={product.stock} 
          />
          <ProductData 
            category={product.categoryName || "Categoría desconocida"}
            subCategory={product.subCategoryName || "Subcategoría no especificada"}
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
