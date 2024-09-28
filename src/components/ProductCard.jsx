import { Link } from "react-router-dom";

const ProductCard = ( {image, title, price, productId}) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg text-center">
      <Link to={`/product/${productId}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover rounded-md"
        />
      </Link>
      <h3 className="mt-2">{title}</h3>
      <p className="mt-1 text-gray-700">${price}</p>
      <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
