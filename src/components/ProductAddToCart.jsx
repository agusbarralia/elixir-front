import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductAddToCart() {
  const product = useSelector((state) => state.products.selectedProduct); // Ajustar según la estructura
  const { price, productId, name, discount, stock } = product || {};
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const discountPercentage = discount * 100;
  const discountedPrice = discount > 0 ? (price * (1 - discount)).toFixed(2) : price;

  const changeQuantity = (delta) =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Para agregar al carrito, primero se debe iniciar sesión.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/cart/add?productId=${productId}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert(`${name} agregado al carrito con éxito!`);
      } else {
        alert('No se pudo agregar el producto al carrito.');
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Hubo un problema al agregar el producto al carrito.');
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-baseline mb-6">
        {discount > 0 ? (
          <div>
            <p className="text-gray-500 line-through decoration-red-600 mr-2">${price?.toFixed(2)}</p>
            <p className="text-red-600 font-bold text-xl">
              ${discountedPrice} ({discountPercentage.toFixed(0)}% OFF)
            </p>
          </div>
        ) : (
          <p className="text-3xl">${price?.toFixed(2)}</p>
        )}
      </div>
      <div className="flex items-center mb-4">
        <button onClick={() => changeQuantity(-1)} className="border px-4 py-2 text-xl font-bold bg-gray-200 hover:bg-gray-300">
          -
        </button>
        <input type="number" min="1" value={quantity} readOnly className="border p-2 w-16 text-center mx-2 bg-gray-100" />
        <button onClick={() => changeQuantity(1)} className="border px-4 py-2 text-xl font-bold bg-gray-200 hover:bg-gray-300">
          +
        </button>
      </div>
      {stock > 0 ? (
        <button className="w-80 px-4 py-3 bg-black text-white font-bold hover:bg-gray-800" onClick={addToCart}>
          Agregar al Carrito
        </button>
      ) : (
        <p className="mt-2 text-red-600 font-bold">No hay stock del producto</p>
      )}
    </div>
  );
}

export default ProductAddToCart;
