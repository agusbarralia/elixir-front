/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Para agregar al carrito, primero se debe iniciar sesión.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/cart/add?productId=${product.productId}&quantity=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        alert(`${product.name} agregado al carrito con éxito!`);
      } else {
        alert('No se pudo agregar el producto al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Hubo un problema al agregar el producto al carrito.');
    }
  };

  const imageType = "image/png";
  const image = product.imagesList && product.imagesList.length > 0
    ? product.imagesList[0]?.imageData
    : null;
  const imageUrl = image ? `data:${imageType};base64,${image}` : "/placeholder.jpg";

  const discount = product.discount || 0;
  const discountPercentage = discount * 100;
  const discountedPrice = discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;

  return (
    <div className="bg-white p-4 rounded text-center hover:cursor-pointer hover:bg-gray-100">
      <div onClick={() => navigate(`/product/${product.name}`, { state: { product } })}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        <h3 className="mt-2">{product.name}</h3>
        
        {discount > 0 ? (
          <div>
            <p className="mt-1 text-gray-500 line-through">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-red-600 font-bold">
              ${discountedPrice} ({discountPercentage.toFixed(0)}% OFF)
            </p>
          </div>
        ) : (
          <p className="mt-1 text-gray-700">${product.price.toFixed(2)}</p>
        )}
      </div>
      <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded" onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
