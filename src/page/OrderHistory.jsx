import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const url = 'http://localhost:8080/orders';

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token desde localStorage
      },
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }
        return response.json();
      })
    .then((data) => setOrders(data))
    .catch((error) => console.error("Error:", error));
  }, [url]);
  
  useEffect(() => {
    console.log(orders.length); // Solo se ejecutará cuando 'orders' cambie
  }, [orders]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Historial de Pedidos</h2>
  
      {orders.length === 0 ? (
        <p>No tienes pedidos realizados aún.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.orderId}
              to={`/order/${order.orderId}`}
              className="block border p-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-2xl font-semibold">Pedido #{order.orderId}</h3>
              <p className="text-gray-600">Fecha: {order.order_date || 'Fecha no disponible'}</p>
              <p className="text-gray-600">Estado: {order.status || 'Estado no disponible'}</p>
  
              <h4 className="text-xl font-semibold mt-4">Detalles del Pedido</h4>
              <ul className="list-disc list-inside">
                {order.productsOrders && order.productsOrders.length > 0 ? (
                  order.productsOrders.map((item, index) => (
                    <li key={index}>
                      {item.productDTO.name} x {item.quantity} - ${item.unit_price * item.quantity}
                    </li>
                  ))
                ) : (
                  <p>No hay productos en este pedido.</p>
                )}
              </ul>
  
              <div className="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>${order.total || 0}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
  }
  

export default OrderHistory;
