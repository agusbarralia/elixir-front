import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminEditProduct() {
  const { productId } = useParams();
  //const formatImage = (image) => `data:image/png;base64,${image}`;

  const [product, setProduct] = useState({
    name: '',
    productDescription: '',
    price: '',
    stock: '',
    varietyName: '',
    subCategoryName: '',
    categoryName: '',
    imagesList: [], // Cambiado a array para múltiples imágenes
  });

  const [categories, setCategories] = useState([]);

  const url = `http://localhost:8080/products/id?id=${productId}`;
  const categoriesUrl = `http://localhost:8080/categories`; // URL para obtener las categorías

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error:", error));
  }, [url]);

  useEffect(() => {
    // Obtener las categorías
    fetch(categoriesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud de categorías");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error:", error));
  }, [categoriesUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({ ...prev, imagesList: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar el fetch para actualizar el producto
    console.log('Producto actualizado:', product);
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <textarea
            name="product_description"
            value={product.productDescription}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID de Variedad:</label>
          <input
            type="text"
            name="varietyId"
            value={product.varietyName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID de Subcategoría:</label>
          <input
            type="text"
            name="subCategoryId"
            value={product.subCategoryName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categoría:</label>
          <select
            name="categoryId"
            value={product.category_id} // Cambiado para asegurar que se refleje el valor correcto
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imágenes:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
