import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { clearOrder } from '../redux/checkoutSlice';
import { useDispatch } from 'react-redux';


function ThankPage() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(clearOrder()); // Limpiar el producto al desmontar
 
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold mb-6">¡Gracias por tu compra!</h2>
      <p className="text-lg mb-4">Tu pedido ha sido procesado exitosamente.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Volver a la página principal
      </Link>
    </div>
  );
}

export default ThankPage;