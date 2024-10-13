import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditProduct() {
  const { productId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    imagesList: [], // Para imágenes existentes
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [newImages, setNewImages] = useState([]); // Para imágenes nuevas
  const [removedImages, setRemovedImages] = useState([]); // Para imágenes que se eliminan

  const url = `http://localhost:8080/products/id?id=${productId}`;
  const categoriesUrl = `http://localhost:8080/categories`;
  const subCategoriesUrl = `http://localhost:8080/subcategories`;
  const varietiesUrl = `http://localhost:8080/varieties`;
  const urlEdit = `http://localhost:8080/products/admin/update/values`;
  const urlUpdateImages = `http://localhost:8080/products/admin/update/images`;

  // Cargar categorías, subcategorías y variedades
  useEffect(() => {
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al obtener categorías:", error));

    fetch(subCategoriesUrl)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) => console.error("Error al obtener subcategorías:", error));

    fetch(varietiesUrl)
      .then((response) => response.json())
      .then((data) => setVarieties(data))
      .catch((error) => console.error("Error al obtener variedades:", error));
  }, [categoriesUrl, subCategoriesUrl, varietiesUrl]);

  // Cargar datos del producto seleccionado
  useEffect(() => {
    if (categories.length > 0 && subCategories.length > 0 && varieties.length > 0) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);

          const foundCategory = categories.find((cat) => cat.name === data.categoryName);
          if (foundCategory) setProduct((prev) => ({ ...prev, categoryId: foundCategory.category_id }));

          const foundSubCategory = subCategories.find((sub) => sub.name === data.subCategoryName);
          if (foundSubCategory) setProduct((prev) => ({ ...prev, subCategoryId: foundSubCategory.subCategory_id }));

          const foundVariety = varieties.find((variety) => variety.name === data.varietyName);
          if (foundVariety) setProduct((prev) => ({ ...prev, varietyId: foundVariety.variety_id }));
        })
        .catch((error) => console.error("Error al obtener producto:", error));
    }
  }, [categories, subCategories, varieties, url]);

  // Manejar la eliminación de una imagen existente
  const handleStoredImageRemove = (imageId) => {
    setRemovedImages((prev) => [...prev, imageId]);
    setProduct((prev) => ({
      ...prev,
      imagesList: prev.imagesList.filter((img) => img.imageId !== imageId),
    }));
    console.log(removedImages);

  };

  // Manejar la carga de nuevas imágenes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // Manejar la eliminación de una nueva imagen antes de enviar el formulario
  const handleNewImageRemove = (index) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedImages);
  };

  // Manejar el envío del formulario
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

    newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    removedImages.forEach((imageUrl) => {
      formData.append("removedImages", imageUrl);
    });

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
      alert("Producto actualizado con éxito.");
      // Ahora actualizar las imágenes
      await updateImages();

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el producto.");
    }
  };

  // Función para actualizar las imágenes
  const updateImages = async () => {
    const formData = new FormData();
  
    // Agrega el ID del producto como texto
    formData.append("productId", product.productId);
  
    // Agrega las nuevas imágenes (archivos) al FormData
    newImages.forEach((image) => {
      formData.append("imagesAdd", image); // Asegúrate que "image" sea un archivo válido
    });
  
    // Agrega las imágenes a remover como texto (URLs o identificadores)
    removedImages.forEach((imageId) => {
      formData.append("imagesRemove", imageId); // Enviamos cada ID como un valor independiente
    });

    try {
      console.log(removedImages);
      const response = await fetch("http://localhost:8080/products/admin/update/images", {
        method: "PUT",
        body: formData, // Enviar como form-data
        headers: {
          Authorization: `Bearer ${token}`, // Mantener el header de autorización si es necesario
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar imágenes");
      }
  
      alert("Imágenes actualizadas con éxito.");
      navigate('/admin/products');
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar imágenes");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Producto:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <textarea
            value={product.productDescription}
            onChange={(e) => setProduct({ ...product, productDescription: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700">Stock:</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-gray-700">Categoría:</label>
          <select
            value={product.categoryId}
            onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategoría */}
        <div className="mb-4">
          <label className="block text-gray-700">Subcategoría:</label>
          <select
            value={product.subCategoryId}
            onChange={(e) => setProduct({ ...product, subCategoryId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar subcategoría</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.subCategory_id} value={subCategory.subCategory_id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Variedad */}
        <div className="mb-4">
          <label className="block text-gray-700">Variedad:</label>
          <select
            value={product.varietyId}
            onChange={(e) => setProduct({ ...product, varietyId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar variedad</option>
            {varieties.map((variety) => (
              <option key={variety.variety_id} value={variety.variety_id}>
                {variety.name}
              </option>
            ))}
          </select>
        </div>

        {/* Imágenes Existentes */}
        <div className="mb-4">
          <label className="block text-gray-700">Imágenes Existentes:</label>
          <div className="flex space-x-2">
            {product.imagesList.map((image) => {
              const imageType = "image/png"; // Ajusta si el tipo es diferente
              const imageData = image.imageData || "/placeholder.jpg"; // Usa imagen en base64 o placeholder
              const imageUrl = imageType ? `data:${imageType};base64,${imageData}` : imageData;
              

              return (
                <div key={image.imageId} className="relative">
                  <img src={imageUrl} alt={`Imagen ${image.imageId}`} className="w-24 h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => handleStoredImageRemove(image.imageId)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nuevas Imágenes */}
        <div className="mb-4">
          <label className="block text-gray-700">Nuevas Imágenes:</label>
          <input type="file" multiple onChange={handleFileChange} className="mt-1 block w-full" />
          <div className="flex space-x-2 mt-2">
            {newImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(image)} alt={`Imagen nueva ${index}`} className="w-24 h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => handleNewImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
