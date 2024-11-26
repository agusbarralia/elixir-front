import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearOrder } from '../redux/checkoutSlice';
import { useDispatch } from 'react-redux';
import Confetti from 'react-confetti';

function ThankPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrder()); // Limpiar el producto al desmontar
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen text-center relative">
      {/* Agregar Confetti solo en esta sección */}
      <Confetti />
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6">¡Gracias por tu compra!</h2>
        <p className="text-lg mb-4">Tu pedido ha sido procesado exitosamente.</p>
        <Link to="/" className="text-rose-950 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}

export default ThankPage;
