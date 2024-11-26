import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processCheckout } from '../redux/checkoutSlice';
import { fetchProducts } from '../redux/productSlice';

function Checkout() {
  const dispatch = useDispatch();
  const {items: cartItems, error, loading} = useSelector((state)=> state.cart);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.users);
  const {order,loading: loadingOrder,error: errorOrder} = useSelector((state)=> state.checkout)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.discount_price * item.quantity, 0).toFixed(2);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina cualquier carácter que no sea número

    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Inserta '/' entre mes y año
    }

    setPaymentInfo({ ...paymentInfo, expiryDate: value });
  };

  const getFormattedExpiryDate = () => {
    const rawValue = paymentInfo.expiryDate.replace(/\D/g, ''); // Solo números
    if (rawValue.length <= 2) return rawValue;
    return `${rawValue.slice(0, 2)}/${rawValue.slice(2, 4)}`; // Formatear para mostrar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Información de Envío:", shippingInfo);
    console.log("Información de Pago:", paymentInfo);
    dispatch(processCheckout(token)).then(() => {
      dispatch(fetchProducts())
    });
  };

  useEffect(() => {
    if (order) {
      navigate('/thankspage'); // Redirige a la página de agradecimiento
    }
  }, [order, navigate]); // Escucha los cambios en `order` y `navigate`

  if (loading) {
    return <p>Cargando pedido...</p>;
  }

  if (loadingOrder) {
    return <p>Procesando orden...</p>;
  }


  if (errorOrder) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:mr-4">
          <h3 className="text-2xl font-semibold mb-4">Detalles de Envío</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre Completo"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Dirección"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Código Postal"
                value={shippingInfo.postalCode}
                maxLength={4}
                onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value.replace(/\D/g, '') })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="País"
                value={shippingInfo.country}
                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>

            <h3 className="text-2xl font-semibold mb-4">Detalles de Pago</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={paymentInfo.cardNumber}
                maxLength={16} // Limitar la longitud a 5 caracteres visibles (incluyendo '/')
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value.replace(/\D/g, '') })
                }
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Fecha de Expiración (MM/YY)"
                value={getFormattedExpiryDate()}
                onChange={handleExpiryDateChange}
                maxLength={5} // Limitar la longitud a 5 caracteres visibles (incluyendo '/')
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })
                }
                maxLength={3} // Limitar a 3 dígitos
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-950 text-white py-2 px-4 rounded-lg hover:bg-rose-700"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        <div className="md:w-1/2 md:ml-4 mt-8 md:mt-0">
          <h3 className="text-2xl font-semibold mb-4">Resumen del Pedido</h3>
          <div className="border p-4 rounded-lg mb-4">
            {cartItems.map((item) => (
              <div key={item.productscart_id} className="flex justify-between mb-2">
                <span>
                  {item.title} x {item.quantity} - {item.name}
                </span>
                <span>${(item.discount_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg">
              <span>Subtotal:</span>
              <span>${calculateSubtotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
