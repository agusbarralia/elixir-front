/* eslint-disable react/prop-types */
import { useNavigate} from "react-router-dom";

const ProductCard = ({product}) => {
  // Si la imagen es en formato base64, añade el prefijo necesario.
  // onClick={() => navigate(`/product/${product.name}`, { state: { product } })}  // Incluir el nombre del producto en la URL

  const imageType = "image/png"
  const image = product.imagesList[0]?.imageData || "/placeholder.jpg" 

  const imageUrl = imageType ? `data:${imageType};base64,${image}` : image;
  const navigate = useNavigate();  // Hook para la navegación

  return (
    <div className="bg-white p-4 rounded shadow-lg text-center hover:cursor-pointer hover:bg-gray-100">
      <div 
      onClick={() => navigate(`/product/${product.name}`, { state: { product } })}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md"
          onError={(e) => (e.target.src = "/placeholder.png")} // Muestra un placeholder si la imagen falla.
        />
      <h3 className="mt-2">{product.name}</h3>
      <p className="mt-1 text-gray-700">${product.price}</p>
      </div>
      <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
