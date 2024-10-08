import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem('role'); // Obtener el rol del local storage
  const token = localStorage.getItem('token'); // Obtener el token JWT del local storage
  //const baseUrl = 'http://localhost:8080/products/admin';
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/'); // Redirigir a la página principal si no es admin
    }
    fetchProducts(); // Cargar productos al montar el componente
  }, [role, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProducts(data); // Establecer los productos en el estado
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/create'); // Redirigir al formulario de creación de productos
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`); // Redirigir al formulario de creación de productos
  };
  return (
      
      <div className="flex-1 bg-gray-100 p-6">
        <h2 className="text-2xl mb-4">Lista de Productos</h2>
        <button 
          onClick={handleAddProduct}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Producto
        </button>
        
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border-b">ID</th>
              <th className="py-2 border-b">Nombre</th>
              <th className="py-2 border-b">Descripción</th>
              <th className="py-2 border-b">Precio</th>
              <th className="py-2 border-b">Stock</th>
              <th className="py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td className="py-2 border-b">{product.productId}</td>
                <td className="py-2 border-b">{product.name}</td>
                <td className="py-2 border-b">{product.product_description}</td>
                <td className="py-2 border-b">{product.price}</td>
                <td className="py-2 border-b">{product.stock}</td>
                <td className="py-2 border-b">
                  <button onClick={() => handleEditProduct(product.productId)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Editar
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default AdminProduct;
