import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminEditProduct() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    productDescription: "",
    price: "",
    stock: "",
    varietyName: "",
    varietyId: "",
    subCategoryName: "",
    subCategoryId: "",
    categoryName: "",
    categoryId: "",
    imagesList: [],
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);

  const url = `http://localhost:8080/products/id?id=${productId}`;
  const categoriesUrl = `http://localhost:8080/categories`;
  const subCategoriesUrl = `http://localhost:8080/subcategories`;
  const varietiesUrl = `http://localhost:8080/varieties`;

  const urlEdit = `http://localhost:8080/products/admin/update/values`;

  useEffect(() => {
    // Obtener todas las categorías
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  
    // Obtener todas las subcategorías
    fetch(subCategoriesUrl)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) =>
        console.error("Error al obtener subcategorías:", error)
      );
  
    // Obtener todas las variedades
    fetch(varietiesUrl)
      .then((response) => response.json())
      .then((data) => setVarieties(data))
      .catch((error) => console.error("Error al obtener variedades:", error));
  }, [categoriesUrl, subCategoriesUrl, varietiesUrl]);
  
  useEffect(() => {
    // Solo proceder cuando categorías, subcategorías y variedades estén cargadas
    if (categories.length > 0 && subCategories.length > 0 && varieties.length > 0) {
      // Obtener el producto
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
  
          // Asignar categoryId, subCategoryId y varietyId basados en los nombres
          const foundCategory = categories.find(
            (cat) => cat.name === data.categoryName
          );
          if (foundCategory) {
            setProduct((prev) => ({
              ...prev,
              categoryId: foundCategory.category_id,
            }));
          }
  
          const foundSubCategory = subCategories.find(
            (sub) => sub.name === data.subCategoryName
          );
          if (foundSubCategory) {
            setProduct((prev) => ({
              ...prev,
              subCategoryId: foundSubCategory.subCategory_id,
            }));
          }
  
          const foundVariety = varieties.find(
            (variety) => variety.name === data.varietyName
          );
          if (foundVariety) {
            setProduct((prev) => ({
              ...prev,
              varietyId: foundVariety.variety_id,
            }));
          }
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }
  }, [categories, subCategories, varieties, url]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", product.productId);
    formData.append("name", product.name);
    formData.append("product_description", product.productDescription);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("varietyId", product.varietyId);
    formData.append("subCategoryId", product.subCategoryId);
    formData.append("categoryId", product.categoryId);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch(`${urlEdit}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const data = await response.json();
      console.log("Producto actualizado:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos de nombre, descripción, precio y stock */}
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
            name="productDescription"
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
          <label className="block text-gray-700">Categoría:</label>
          <select
            name="categoryId"
            value={product.categoryId || ""} // Mostrar el valor actual de la categoría
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {categories.map((category) => (
              <option key={category.name} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Subcategoría:</label>
          <select
            name="subCategoryId"
            value={product.subCategoryId || ""} // Mostrar el valor actual de la subcategoría
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {subCategories.map((subCategory) => (
              <option
                key={subCategory.name}
                value={subCategory.subCategory_id}
              >
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Variedad:</label>
          <select
            name="varietyId"
            value={product.varietyId || ""} // Mostrar el valor actual de la variedad
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {varieties.map((variety) => (
              <option key={variety.name} value={variety.variety_id}>
                {variety.name}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para subir imágenes */}
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
