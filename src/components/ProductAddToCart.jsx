/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductAddToCart({ price, productId, productName, discount }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Convertir el descuento a porcentaje y calcular el precio con descuento si el descuento es mayor a 0.
  const discountPercentage = discount * 100; // Convertir a porcentaje
  const discountedPrice = discount > 0 ? (price * (1 - discount)).toFixed(2) : price; // Calcular precio con descuento
  console.log(discount);
  console.log(discountedPrice); 
  // Función para actualizar la cantidad basada en un incremento o decremento.
  const changeQuantity = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  // Función para añadir el producto al carrito.
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluir el token de autenticación si es necesario.
        },
      });

      if (response.ok) {
        alert(`${productName} agregado al carrito con éxito!`);
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
      {/* Sección de precios */}
      <div className="flex items-baseline mb-6">
        {/* Mostrar el precio original tachado y el precio con descuento si corresponde */}
        {discount > 0 ? (
          <div>
            {/* Precio original tachado */}
            <p className="text-gray-500 line-through decoration-red-600 mr-2">
              ${price.toFixed(2)}
            </p>
            {/* Precio con descuento y porcentaje */}
            <p className="text-red-600 font-bold text-xl">
              ${discountedPrice} ({discountPercentage.toFixed(0)}% OFF)
            </p>
          </div>
        ) : (
          // Mostrar solo el precio normal si no hay descuento
          <p className="text-3xl">${price.toFixed(2)}</p>
        )}
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center mb-4">
        {/* Botón para disminuir cantidad */}
        <button
          onClick={() => changeQuantity(-1)}
          className="border px-4 py-2 text-xl font-bold bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>

        {/* Campo de entrada para mostrar la cantidad */}
        <input
          type="number"
          min="1"
          value={quantity}
          readOnly // Deshabilitar la edición manual.
          className="border p-2 w-16 text-center mx-2 bg-gray-100"
        />

        {/* Botón para aumentar cantidad */}
        <button
          onClick={() => changeQuantity(1)}
          className="border px-4 py-2 text-xl font-bold bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Botón para agregar al carrito */}
      <button className="w-80 px-4 py-3 bg-black text-white font-bold hover:bg-gray-800" onClick={addToCart}> 
        Agregar al Carrito
      </button>
    </div>
  );
}

export default ProductAddToCart;
