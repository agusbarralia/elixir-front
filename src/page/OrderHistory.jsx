import { useState } from 'react';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const [orders] = useState([
    {
      id: 1,
      date: '2024-09-15',
      items: [
        { title: 'Vino Recomendado', quantity: 2, price: 1500 },
        { title: 'Cerveza Artesanal', quantity: 1, price: 800 },
      ],
      total: 3800,
      status: 'Enviado',
    },
    {
      id: 2,
      date: '2024-09-10',
      items: [
        { title: 'Cerveza Artesanal', quantity: 3, price: 800 },
      ],
      total: 2400,
      status: 'Entregado',
    },
    {
      id: 3,
      date: '2024-09-05',
      items: [
        { title: 'Vino Recomendado', quantity: 1, price: 1500 },
      ],
      total: 1500,
      status: 'Cancelado',
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Historial de Pedidos</h2>

      {orders.length === 0 ? (
        <p>No tienes pedidos realizados aún.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link 
              key={order.id} 
              to={`/order/${order.id}`} 
              className="block border p-4 rounded-lg shadow hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-2xl font-semibold">Pedido #{order.id}</h3>
              <p className="text-gray-600">Fecha: {order.date}</p>
              <p className="text-gray-600">Estado: {order.status}</p>

              <h4 className="text-xl font-semibold mt-4">Detalles del Pedido</h4>
              <ul className="list-disc list-inside">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>${order.total}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
