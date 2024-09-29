function OrderDetail() {
  // Datos de ejemplo para la orden
  const orderData = {
    orderNumber: '123456',
    orderDate: '2/11/2022',
    items: [
      { id: '23423423', description: 'Producto ABC', quantity: 15, unitPrice: 150, total: 2250, image: '/trumpeter 1.png' },
      { id: '45456454', description: 'Producto XYZ', quantity: 1, unitPrice: 75, total: 75, image: '/trumpeter 1.png' },
    ],
    net: 2325,
    discount: 0,
    subtotal: 2325,
    iva: 441.75,
    total: 2766.75,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg shadow-lg p-6 mb-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Orden de Compra</h2>
          <button 
            onClick={() => window.history.back()} // Navegar hacia atrás
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
            Regresar
          </button>
        </div>
        <p className="text-gray-600">Número de Orden: {orderData.orderNumber}</p>
        <p className="text-gray-600">Fecha: {orderData.orderDate}</p>
        
        <table className="w-full mt-4">
          <thead>
            <tr>
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
            {orderData.items.map(item => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <img src={item.image} alt={item.description} className="w-20 h-20 object-cover" />
                </td>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <p className="font-semibold">Neto: ${orderData.net.toFixed(2)}</p>
          <p className="font-semibold">Descuento: ${orderData.discount.toFixed(2)}</p>
          <p className="font-semibold">Subtotal: ${orderData.subtotal.toFixed(2)}</p>
          <p className="font-semibold">IVA 19%: ${orderData.iva.toFixed(2)}</p>
          <p className="font-semibold">Total: ${orderData.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
