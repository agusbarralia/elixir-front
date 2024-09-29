import { useState } from 'react';

function Checkout() {
  // Estado para los datos del formulario de checkout
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

  // Estado de ejemplo para los productos del carrito
  const cartItems = [
    { id: 1, title: 'Vino Recomendado', price: 1500, quantity: 2 },
    { id: 2, title: 'Cerveza Artesanal', price: 800, quantity: 3 },
  ];

  // Calcular el subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Manejar el envío del formulario de checkout
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar la compra
    console.log("Información de Envío:", shippingInfo);
    console.log("Información de Pago:", paymentInfo);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="flex flex-col md:flex-row">
        {/* Información de Envío y Pago */}
        <div className="md:w-1/2 md:mr-4">
          <h3 className="text-2xl font-semibold mb-4">Detalles de Envío</h3>
          <form onSubmit={handleSubmit}>
            {/* Información de envío */}
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
                onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
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

            {/* Información de pago */}
            <h3 className="text-2xl font-semibold mb-4">Detalles de Pago</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                placeholder="Número de Tarjeta"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Fecha de Expiración (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Resumen del carrito */}
        <div className="md:w-1/2 md:ml-4 mt-8 md:mt-0">
          <h3 className="text-2xl font-semibold mb-4">Resumen del Pedido</h3>
          <div className="border p-4 rounded-lg mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
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
