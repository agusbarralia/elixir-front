import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/productSlice';

const AdminProduct = () => {
  const [productToDelete, setProductToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [discountValue, setDiscountValue] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener productos desde el store
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { role,token } = useSelector((state) => state.users);

  // Cargar productos al montar el componente si no están disponibles
  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products,role, navigate]);

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

  const handleApplyDiscount = async (product_id) => {
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('discount', parseFloat(discountValue / 100)); // Asegúrate de que sea un número

    try {
      const response = await fetch(`http://localhost:8080/products/admin/update/discount`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Aquí pasas el formData
      });

      if (response.ok) {
        fetchProducts();
        setShowDiscountDialog(false);
        setDiscountValue('');
      }
    } catch (error) {
      console.error('Error applying discount:', error);
    }
  };


  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error}</p>;

  return (
    <div className="flex-1 bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-4">Lista de Productos</h2>
      <button 
        onClick={handleAddProduct}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition">
        Agregar Producto
      </button>
      
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productId} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{product.productId}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">$ {product.price.toFixed(2)}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button 
                  onClick={() => handleEditProduct(product.productId)} 
                  className="bg-yellow-500 text-white px-2 py-1 rounded shadow hover:bg-yellow-400 transition">
                  Editar
                </button>
                <button 
                  onClick={() => confirmDeleteProduct(product.productId)} 
                  className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-400 transition">
                  Eliminar
                </button>
                <button 
                  onClick={() => {
                    setSelectedProductId(product.productId);
                    setShowDiscountDialog(true);
                  }} 
                  className="bg-green-500 text-white px-2 py-1 rounded shadow hover:bg-green-400 transition">
                  Aplicar Descuento
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

      {showDiscountDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Aplicar Descuento</h3>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="Valor del descuento (%)"
              className="border border-gray-300 px-4 py-2 rounded mt-2 w-full"
              required
            />
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => handleApplyDiscount(selectedProductId)} 
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition mr-2">
                Aplicar
              </button>
              <button 
                onClick={() => setShowDiscountDialog(false)} 
                className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400 transition">
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
