/* eslint-disable react/prop-types */
import { useState } from 'react'

function ProductAddToCart({ price , productId, productName}) {
  const [quantity, setQuantity] = useState(1);

  // Función para actualizar la cantidad basada en un incremento o decremento
  const changeQuantity = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity > 0 ? newQuantity : 1; 
    });
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cart/add?productId=${productId}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Asegúrate de incluir el token de autenticación si es necesario
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
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
      <div className="flex items-baseline mb-6">
        <span className="text-3xl mr-8">${price}</span>

        <div className="flex items-center">
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
            readOnly // Deshabilitar la edición manual
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
      </div>

      
      <button className="w-80 px-4 py-3 bg-black text-white font-bold hover:bg-gray-800" onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductAddToCart;
