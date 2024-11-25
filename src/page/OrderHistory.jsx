import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeOrderState, fetchOrders, fetchOrdersAdmin } from '../redux/orderSlice';

function OrderHistory() {
  const dispatch = useDispatch()

  const {role,token} = useSelector((state)=> state.users)
  const {items: orders, loading, error} = useSelector((state)=> state.orders)
  // Determinamos si el usuario es admin y seleccionamos las URLs correctas
  const selectedEnd = role === 'ADMIN' ? '/admin/orders/' : '/orders/';

  useEffect(()=>{
    if(token){
      if(role === 'ADMIN') dispatch(fetchOrdersAdmin(token))
      else if(role != 'ADMIN') dispatch(fetchOrders(token))
    }
    },[dispatch,role,token])

  // Función para actualizar el estado de la orden
  const updateOrderState = (orderId) => {
    dispatch(changeOrderState({token,orderId}))
  };

  if (loading) return <p>Cargando ordenes...</p>;
  if (error) return <p>Error al cargar la orden: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Historial de Pedidos</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos realizados aún.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="border border-gray-300 p-4 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
              <Link to={`${selectedEnd}${order.orderId}`} className="block">
                <h3 className="text-2xl font-semibold">Pedido #{order.orderId}</h3>
                <p className="text-gray-600">Fecha: {order.order_date || 'Fecha no disponible'}</p>
                <p className="text-gray-600">Estado: {order.state || 'Estado no disponible'}</p>

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

              {role === 'ADMIN' && order.state === 'Pendiente' && (
                <button
                  onClick={() => updateOrderState(order.orderId)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  Finalizar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
