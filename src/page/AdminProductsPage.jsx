import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Función para la creación y edición de productos
const AdminProductsPage = () => {

    const role = localStorage.getItem('role'); // Obtener el rol del local storage
    const token = localStorage.getItem('token'); // Obtener el token JWT del local storage
    const navigate = useNavigate(); // Hook para redireccionar

    useEffect(() => {
      if (role !== 'ADMIN') {
        navigate('/'); // Redirigir a la página principal si no es admin
      }
    }, [role, navigate]);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    product_description: '',
    price: '',
    stock: '',
    varietyId: '',
    subCategoryId: '',
    categoryId: '',
    images: null,
  });

  const [productToUpdate, setProductToUpdate] = useState(null);

  // URL base del servidor backend
  const baseUrl = 'http://localhost:8080/products/admin';

  // Obtener la lista de productos (esto puede mejorar si tienes una lista paginada)
  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Manejar cambios en los campos del nuevo producto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Crear un nuevo producto
  const handleCreateProduct = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });

    fetch(`${baseUrl}/create`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,  // Enviar el token en la cabecera
                },
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);  // Agregar el producto recién creado a la lista
        setNewProduct({ name: '', product_description: '', price: '', stock: '', varietyId: '', subCategoryId: '', categoryId: '', images: null });
      })
      .catch(error => console.error('Error:', error));
  };

  // Cambiar estado de un producto
  const handleChangeState = (productId) => {
    fetch(`${baseUrl}/changestate?product_id=${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,  // Enviar el token en la cabecera
                },
    })
      .then(response => response.json())
      .then(updatedProduct => {
        const updatedProducts = products.map(product => product.productId === updatedProduct.productId ? updatedProduct : product);
        setProducts(updatedProducts);  // Actualizar la lista con el nuevo estado
      })
      .catch(error => console.error('Error:', error));
  };

  // Actualizar un producto (valores)
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productToUpdate).forEach(key => {
      formData.append(key, productToUpdate[key]);
    });

    fetch(`${baseUrl}/update/values`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,  // Enviar el token en la cabecera
                },
    })
      .then(response => response.json())
      .then(updatedProduct => {
        const updatedProducts = products.map(product => product.productId === updatedProduct.productId ? updatedProduct : product);
        setProducts(updatedProducts);  // Actualizar la lista
        setProductToUpdate(null);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-6">Admin Panel</h1>

      {/* Formulario para crear nuevo producto */}
      <form className="mb-8" onSubmit={handleCreateProduct}>
        <h2 className="text-2xl mb-4">Crear Producto</h2>
        <input name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Nombre" className="border p-2 mb-2 block" required />
        <textarea name="product_description" value={newProduct.product_description} onChange={handleInputChange} placeholder="Descripción" className="border p-2 mb-2 block" required />
        <input name="price" type="number" value={newProduct.price} onChange={handleInputChange} placeholder="Precio" className="border p-2 mb-2 block" required />
        <input name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} placeholder="Stock" className="border p-2 mb-2 block" required />
        <input name="varietyId" value={newProduct.varietyId} onChange={handleInputChange} placeholder="ID de Variedad" className="border p-2 mb-2 block" required />
        <input name="subCategoryId" value={newProduct.subCategoryId} onChange={handleInputChange} placeholder="ID de SubCategoría" className="border p-2 mb-2 block" required />
        <input name="categoryId" value={newProduct.categoryId} onChange={handleInputChange} placeholder="ID de Categoría" className="border p-2 mb-2 block" required />
        <input type="file" name="images" onChange={(e) => setNewProduct({ ...newProduct, images: e.target.files[0] })} className="border p-2 mb-2 block" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Crear Producto</button>
      </form>

      {/* Lista de productos con acciones */}
      <h2 className="text-2xl mb-4">Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.productId} className="mb-4">
            <div className="border p-4">
              <h3 className="text-xl">{product.name}</h3>
              <p>{product.product_description}</p>
              <p>Precio: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleChangeState(product.productId)} className="bg-yellow-500 text-white px-4 py-2 mr-2">Cambiar Estado</button>
              <button onClick={() => setProductToUpdate(product)} className="bg-green-500 text-white px-4 py-2">Editar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario para editar producto */}
      {productToUpdate && (
        <form className="mt-8" onSubmit={handleUpdateProduct}>
          <h2 className="text-2xl mb-4">Editar Producto</h2>
          <input name="name" value={productToUpdate.name} onChange={(e) => setProductToUpdate({ ...productToUpdate, name: e.target.value })} className="border p-2 mb-2 block" required />
          <textarea name="product_description" value={productToUpdate.product_description} onChange={(e) => setProductToUpdate({ ...productToUpdate, product_description: e.target.value })} className="border p-2 mb-2 block" required />
          <input name="price" type="number" value={productToUpdate.price} onChange={(e) => setProductToUpdate({ ...productToUpdate, price: e.target.value })} className="border p-2 mb-2 block" required />
          <input name="stock" type="number" value={productToUpdate.stock} onChange={(e) => setProductToUpdate({ ...productToUpdate, stock: e.target.value })} className="border p-2 mb-2 block" required />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">Actualizar Producto</button>
        </form>
      )}
    </div>
  );
};

export default AdminProductsPage;
