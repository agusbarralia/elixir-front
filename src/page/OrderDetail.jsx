import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OrderDetail() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null); // Cambiado a null para manejar mejor la carga inicial
  const url = `http://localhost:8080/orders/order/${id}`;

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token desde localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }

        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrderData();
  }, [url]);

  if (!orderData) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg shadow-lg p-6 mb-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Orden de Compra</h2>
          <button
            onClick={() => window.history.back()} // Navegar hacia atrás
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Regresar
          </button>
        </div>
        <p className="text-gray-600">Número de Orden: {orderData.orderId}</p>
        <p className="text-gray-600">Fecha: {new Date(orderData.order_date).toLocaleDateString()}</p>

        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Imagen</th>
              <th className="border px-4 py-2">Artículo #</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">CANT</th>
              <th className="border px-4 py-2">Precio Unitario</th>
              <th className="border px-4 py-2">Descuento</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData.productsOrders.map((item, index) => (
              <tr key={item.productOrderId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border px-4 py-2">
                  <img
                    src={
                      item.productDTO.imagesList && item.productDTO.imagesList.length > 0
                        ? `data:image/jpeg;base64,${item.productDTO.imagesList[0].imageData}`
                        : '/placeholder.jpg'
                    }
                    alt={item.productDTO.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{item.productDTO.productId}</td>
                <td className="border px-4 py-2">{item.productDTO.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">${item.unit_price.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {item.productDTO.discount > 0 
                    ? (item.productDTO.discount.toFixed(2) * 100) + '%' 
                    : '-'}
                </td>
                <td className="border px-4 py-2">${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="font-semibold">Total: ${orderData.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
