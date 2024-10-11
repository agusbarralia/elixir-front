/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const EditProductForm = ({ baseUrl, token, productId }) => {
  const [product, setProduct] = useState({
    name: '',
    product_description: '',
    price: '',
    stock: '',
    varietyId: '',
    subCategoryId: '',
    categoryId: '',
    imagesList: [], // Lista de imágenes en base64
    newImages: [],  // Nuevas imágenes seleccionadas por el usuario
  });

  // Cargar el producto y sus imágenes al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/product/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProduct({
          ...data,
          imagesList: data.imagesList || [],  // Asegurarse de que exista la lista de imágenes
        });
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    fetchProduct();
  }, [baseUrl, token, productId]);

  // Formatear las imágenes existentes en base64 o mostrar un placeholder si no existen
  const formatImage = (image) => {
    return image ? `data:image/png;base64,${image}` : '/placeholder.jpg';
  };

  // Manejar cambios en los campos de entrada del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Manejar selección de nuevas imágenes
  const handleImageChange = (e) => {
    setProduct({ ...product, newImages: Array.from(e.target.files) });
  };

  // Manejar el envío del formulario
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('product_description', product.product_description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('varietyId', product.varietyId);
    formData.append('subCategoryId', product.subCategoryId);
    formData.append('categoryId', product.categoryId);

    // Añadir nuevas imágenes seleccionadas por el usuario al FormData
    product.newImages.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch(`${baseUrl}/update-product/${productId}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      const data = await response.json();
      console.log('Producto actualizado:', data);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <form className="mb-8" onSubmit={handleUpdateProduct}>
      <h2 className="text-2xl mb-4">Editar Producto</h2>

      {/* Campos del formulario */}
      <input
        name="name"
        value={product.name}
        onChange={handleInputChange}
        placeholder="Nombre"
        className="border p-2 mb-2 block"
        required
      />

      <textarea
        name="product_description"
        value={product.product_description}
        onChange={handleInputChange}
        placeholder="Descripción"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleInputChange}
        placeholder="Precio"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleInputChange}
        placeholder="Stock"
        className="border p-2 mb-2 block"
        required
      />

      {/* Mostrar las imágenes actuales del producto */}
      <div className="mb-4">
        <h3 className="text-lg">Imágenes actuales:</h3>
        <div className="flex space-x-2">
          {product.imagesList.map((image, index) => (
            <img
              key={index}
              src={formatImage(image.imageData)}
              alt={`Imagen ${index + 1}`}
              className="w-28 h-28 object-cover border"
            />
          ))}
        </div>
      </div>

      {/* Campo para subir nuevas imágenes */}
      <input
        type="file"
        name="images"
        multiple
        onChange={handleImageChange}
        className="border p-2 mb-2 block"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Actualizar Producto
      </button>
    </form>
  );
};

export default EditProductForm;
