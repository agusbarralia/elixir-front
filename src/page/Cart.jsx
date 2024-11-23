import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, fetchAddToCart, updateQuantity, fetchRemove } from '../redux/cartSlice'; // Ajusta el path según tu estructura

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.users);
  const { items: cartItems, loading, error } = useSelector((state) => state.cart);

  // Estado para manejar el popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000); // Desaparece tras 2 segundos

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }else{
      setShowPopup(false);
    }
  }, [error]);

  const handleIncrement = (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    if (token) {
      dispatch(updateQuantity({ id, newQuantity, token }));
    }
  };

  const handleDecrement = (id, currentQuantity) => {
    if (token && currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      dispatch(updateQuantity({ id, newQuantity, token }));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.discount_price || item.unit_price) * item.quantity,
      0
    );
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  const handleRemove = (productId) => {
    dispatch(fetchRemove({ productId, token }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Tu Carrito</h2>

      {/* Popup de error */}
      {showPopup && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-lg z-50 animate-flicker"
        >
          <p>No hay suficiente stock para este producto.</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-2/3 md:mr-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.productscart_id} className="flex items-center border p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Precio:
                      {item.discount_price !== item.unit_price ? (
                        <span>
                          <span className="ml-1 line-through">${item.unit_price.toFixed(2)}</span>
                          <span className="font-semibold text-red-500 ml-2">
                            ${item.discount_price.toFixed(2)}
                          </span>
                        </span>
                      ) : (
                        <span className="ml-1 font-semibold">
                          ${item.unit_price.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecrement(item.product_id, item.quantity)}
                      className="p-1 bg-gray-200 rounded-full"
                    >
                      -
                    </button>
                    <p className="mx-4">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(item.product_id, item.quantity)}
                      className="p-1 bg-gray-200 rounded-full"
                    >
                      +
                    </button>
                    <p className="font-semibold ml-4">
                      ${((item.discount_price || item.unit_price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3 border p-4 h-44 flex flex-col justify-between">
            <p className="text-lg">Total de productos: {calculateTotalItems()}</p>
            <p className="text-2xl mb-4">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <button
              onClick={handleCheckoutClick}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
