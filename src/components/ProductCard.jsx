/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddToCart } from "../redux/cartSlice"; // Asegúrate de ajustar la ruta si es necesario

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.users);

  const addToCart = () => {
    if (!token) {
      alert("Para agregar al carrito, primero se debe iniciar sesión.");
      navigate("/login");
      return;
    }
    const productId = product.productId;
    dispatch(fetchAddToCart({productId,quantity: 1, token}))
      .unwrap()
      .then(() => {
        alert(`${product.name} agregado al carrito con éxito!`);
      })
      .catch((error) => {
        console.error("Error al agregar al carrito:", error);
        alert("Hubo un problema al agregar el producto al carrito.");
      });
  };

  const imageType = "image/png";
  const image =
    product.imagesList && product.imagesList.length > 0
      ? product.imagesList[0]?.imageData
      : null;
  const imageUrl = image
    ? `data:${imageType};base64,${image}`
    : "/placeholder.jpg";

  const discount = product.discount || 0;
  const discountPercentage = discount * 100;
  const discountedPrice =
    discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 w-64 h-auto">
      <div
        onClick={() => navigate(`/product/${product.productId}`)}
        className="cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>

          {discount > 0 ? (
            <div>
              <p className="mt-1 text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-1 text-red-600 font-bold">
                ${discountedPrice}{" "}
                <span className="text-sm text-gray-500">
                  ({discountPercentage.toFixed(0)}% OFF)
                </span>
              </p>
            </div>
          ) : (
            <p className="mt-1 text-gray-700 font-medium">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
      <div className="p-4">
        {product.stock > 0 ? (
          <button
            className="w-full px-4 py-2 bg-red-600 text-white rounded transition duration-200 hover:bg-red-700"
            onClick={addToCart}
          >
            Agregar al carrito
          </button>
        ) : (
          <p className="text-center text-red-600 font-bold">No hay stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
