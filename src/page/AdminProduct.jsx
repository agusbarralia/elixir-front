import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
    fetchProducts();
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
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const confirmDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowConfirmDialog(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/products/admin/changestate?product_id=${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProducts();
        setShowConfirmDialog(false);
      } else {
        console.error('Error deleting product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
              <td className="py-2 border-b">{product.price}</td>
              <td className="py-2 border-b">{product.stock}</td>
              <td className="py-2 border-b">
                <button onClick={() => handleEditProduct(product.productId)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
                <button 
                  onClick={() => confirmDeleteProduct(product.productId)} 
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">¿Estás seguro de que quieres eliminar este producto?</h3>
            <div className="mt-4">
              <button 
                onClick={() => handleDeleteProduct(productToDelete)} 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                Eliminar
              </button>
              <button 
                onClick={() => setShowConfirmDialog(false)} 
                className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
