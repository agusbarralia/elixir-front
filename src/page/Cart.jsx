import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Cart() {
    
  const [cartItems, setCartItems] = useState([
    { id: 1, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, quantity: 2 },
    { id: 2, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, quantity: 1 },
    { id: 3, image: '/trumpeter.png', title: 'Cerveza Artesanal', price: 800, quantity: 3 },
    { id: 4, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, quantity: 2 },
    { id: 5, image: '/trumpeter.png', title: 'Vino Recomendado', price: 1500, quantity: 1 },
    { id: 6, image: '/trumpeter.png', title: 'Cerveza Artesanal', price: 800, quantity: 3 },
  ]);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Tu Carrito</h2>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">

          <div className="md:w-2/3 md:mr-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border p-4">

                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                  
                  <div className="flex-1">

                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="text-gray-600">Precio: ${item.price}</p>
                  </div>
                  
                  <div className="flex items-center">

                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border p-1 w-16 text-center mr-4"
                    />

                    <p className="font-semibold">${item.price * item.quantity}</p>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="ml-4 text-red-500 hover:text-red-700">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3 border p-4 h-44 flex flex-col justify-between">

            <p className="text-lg">Total de productos: {calculateTotalItems()}</p>

            <p className="text-2xl mb-4">Subtotal: ${calculateSubtotal()}</p>
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
