import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate();

  // Función para obtener el carrito desde el backend
  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token en el encabezado
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo recuperar el carrito');
      }

      const data = await response.json();
      
      // Mapear los productos del carrito con su estructura
      const formattedItems = data.productsCart.map((item) => ({
        id: item.product_id,
        quantity: item.quantity,
        price: item.unit_price,
        subtotal: item.subtotal,
        // Agrega cualquier otro campo necesario aquí o realiza una nueva solicitud
      }));

      setCartItems(formattedItems);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
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

      const data = await response.text();
      alert(data)
  
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  }

  // Usar useEffect para llamar a la función fetchCartItems al cargar la página
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { cartItems } });
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
    removeProduct(id)
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

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-2/3 md:mr-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border p-4">
                  {/* Aquí puedes añadir una lógica para obtener la imagen y el título si es necesario */}
                  <div className="flex-1">
                    <h3 className="font-semibold">Producto ID: {item.id}</h3>
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
