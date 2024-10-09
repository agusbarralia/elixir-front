/* eslint-disable react/prop-types */
import React, {useState} from 'react'

function ProductForm({baseUrl,role,token}) {

    const baseUrl1 = 'http://localhost:8080/products/admin/create';

    const [newProduct, setNewProduct] = useState({
        name: '',
        product_description: '',
        price: '',
        stock: '',
        varietyId: '',
        subCategoryId: '',
        categoryId: '',
        images: [],  // Cambiado a array para múltiples imágenes
      });
    
      // Manejador de cambios en el formulario
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
      };
    
      // Manejador del archivo de imagen (múltiples imágenes)
      const handleImageChange = (e) => {
        setNewProduct({ ...newProduct, images: Array.from(e.target.files) });
      };
    
      // Manejador del envío del formulario
      const handleCreateProduct = async (e) => {
        console.log("a")
        console.log(baseUrl1)
        e.preventDefault();
        console.log(newProduct)
        // Crear el objeto FormData
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('product_description', newProduct.product_description);
        formData.append('price', newProduct.price);
        formData.append('stock', newProduct.stock);
        formData.append('varietyId', newProduct.varietyId);
        formData.append('subCategoryId', newProduct.subCategoryId);
        formData.append('categoryId', newProduct.categoryId);
    
        // Añadir cada imagen al FormData
        newProduct.images.forEach((image) => {
          formData.append(`images`, image);
        });
        
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }

        try {
          const response = await fetch(`${baseUrl1}`, {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`,  // Añadir el token en el header
            },
          });
    
          if (!response.ok) {
            throw new Error('Error al crear el producto');
          }
    
          const data = await response.json();
          console.log('Producto creado:', data);
    
          // Limpiar el formulario
          setNewProduct({
            name: '',
            product_description: '',
            price: '',
            stock: '',
            varietyId: '',
            subCategoryId: '',
            categoryId: '',
            images: [],
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };


  return (
    <form className="mb-8" onSubmit={handleCreateProduct}>
      <h2 className="text-2xl mb-4">Crear Producto</h2>

      <input
        name="name"
        value={newProduct.name}
        onChange={handleInputChange}
        placeholder="Nombre"
        className="border p-2 mb-2 block"
        required
      />

      <textarea
        name="product_description"
        value={newProduct.product_description}
        onChange={handleInputChange}
        placeholder="Descripción"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="price"
        type="number"
        value={newProduct.price}
        onChange={handleInputChange}
        placeholder="Precio"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="stock"
        type="number"
        value={newProduct.stock}
        onChange={handleInputChange}
        placeholder="Stock"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="varietyId"
        value={newProduct.varietyId}
        onChange={handleInputChange}
        placeholder="ID de Variedad"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="subCategoryId"
        value={newProduct.subCategoryId}
        onChange={handleInputChange}
        placeholder="ID de SubCategoría"
        className="border p-2 mb-2 block"
        required
      />

      <input
        name="categoryId"
        value={newProduct.categoryId}
        onChange={handleInputChange}
        placeholder="ID de Categoría"
        className="border p-2 mb-2 block"
        required
      />

      <input
        type="file"
        name="images"
        multiple   // Permitir múltiples imágenes
        onChange={handleImageChange}  // Manejador de archivos
        className="border p-2 mb-2 block"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Crear Producto
      </button>
    </form>
  )
}

export default ProductForm