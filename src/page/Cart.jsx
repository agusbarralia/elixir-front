import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mensajes de éxito
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo recuperar el carrito');
      }

      const data = await response.json();
      
      const formattedItems = data.productsCart.map((item) => ({
        id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.unit_price,
        subtotal: item.subtotal,
        discountPrice: item.discount_price,
      }));

      setCartItems(formattedItems);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const formData = new FormData();
      formData.append('productId', parseInt(id));
      formData.append('quantity', parseInt(newQuantity));

      const response = await fetch('http://localhost:8080/cart/update', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Error al actualizar la cantidad'); // Mostrar alerta con el mensaje de error
        setSuccessMessage(null); // Limpiar mensaje de éxito en caso de error
        return; // Salir de la función si hay un error
      }

      const data = await response.text();
      console.log('Cantidad actualizada:', data);

      // Actualizar el carrito solo si la llamada fue exitosa
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
      setSuccessMessage('Cantidad actualizada exitosamente')
      setTimeout(() => {
        setSuccessMessage(''); 
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Guardar el mensaje de error
      setSuccessMessage(null); // Limpiar mensaje de éxito en caso de error
    }
  };

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/remove?productId=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token en el encabezado
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto del carrito');
      }

      setCartItems(cartItems.filter(item => item.id !== id));
  
      setLoading(false);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Tu Carrito</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Mensaje de éxito */}
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-2/3 md:mr-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    Precio:
                    {item.discountPrice !== item.price ? (
                      <span>
                        <span className="ml-1 line-through">${item.price.toFixed(2)}</span>
                        <span className="font-semibold text-red-500 ml-2">${item.discountPrice.toFixed(2)}</span>
                      </span>
                    ) : (
                      <span className="ml-1 font-semibold">${item.price.toFixed(2)}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleDecrement(item.id, item.quantity)}
                    className="p-1 bg-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <p className="mx-4">{item.quantity}</p>
                  <button 
                    onClick={() => handleIncrement(item.id, item.quantity)}
                    className="p-1 bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                  <p className="font-semibold ml-4">
                    ${((item.discountPrice > 0 ? item.discountPrice : item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => removeProduct(item.id)} 
                  className="ml-4 text-red-500 hover:text-red-700">
                  Eliminar
                </button>
              </div>
            ))}
            </div>
          </div>

          <div className="md:w-1/3 border p-4 h-44 flex flex-col justify-between">
            <p className="text-lg">Total de productos: {calculateTotalItems()}</p>
            <p className="text-2xl mb-4">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
            <button onClick={handleCheckoutClick} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
