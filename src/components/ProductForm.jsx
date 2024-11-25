import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTags } from "../redux/tagsSlice";
import { createProduct } from "../redux/productSlice";

function ProductForm({ token }) {
  const baseUrl1 = "http://localhost:8080/products/admin/create";
  const {
    categoriesItems: categories,
    subcategoriesItems: subCategories,
    varietiesItems: varieties,
    loading,
    error,
  } = useSelector((state) => state.tags);
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    product_description: "",
    price: "",
    stock: "",
    varietyId: "",
    subCategoryId: "",
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, images: Array.from(e.target.files) });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    dispatch(createProduct({ token, newProduct }));

    if (!error){
    setSuccessMessage("Producto creado exitosamente");
    }
    setNewProduct({
      name: "",
      product_description: "",
      price: "",
      stock: "",
      varietyId: "",
      subCategoryId: "",
      categoryId: "",
      images: [],
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Crear Producto
      </h2>

      <form className="space-y-4" onSubmit={handleCreateProduct}>
        <input
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="product_description"
          value={newProduct.product_description}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Precio"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="stock"
          type="number"
          value={newProduct.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione una bebida</option>
          {categories.map((category) => (
            <option key={category.name} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="subCategoryId"
          value={newProduct.subCategoryId}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione un tipo de bebida</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory.name} value={subCategory.subCategory_id}>
              {subCategory.name}
            </option>
          ))}
        </select>

        <select
          name="varietyId"
          value={newProduct.varietyId}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione una variedad de bebida</option>
          {varieties.map((variety) => (
            <option key={variety.name} value={variety.variety_id}>
              {variety.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Crear Producto
        </button>
      </form>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 mt-4 rounded-lg text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default ProductForm;
