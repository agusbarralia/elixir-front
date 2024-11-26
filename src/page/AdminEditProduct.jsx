import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllTags } from "../redux/tagsSlice";
import { fetchProductById, fetchProducts, updateProduct } from "../redux/productSlice";

function AdminEditProduct() {
  const {token} = useSelector((state) => state.users)
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    categoriesItems: categories,
    subcategoriesItems: subCategories,
    varietiesItems: varieties,
    loading,
    error,
  } = useSelector((state) => state.tags);
  const {selectedProduct: productData} = useSelector((state)=> state.products)
  const dispatch = useDispatch();

  const [product, setProduct] = useState(productData);
  const [newImages, setNewImages] = useState([]); // Para imágenes nuevas
  const [removedImages, setRemovedImages] = useState([]); // Para imágenes que se eliminan


  // Función para asignar IDs basados en nombres
  const assignIdsBasedOnNames = () => {
    if (!productData) return;

    const updatedProduct = { ...productData };

    // Buscar categoría
    const category = categories.find((cat) => cat.name === productData.categoryName);
    if (category) {
      updatedProduct.categoryId = category.category_id;
    }

    // Buscar subcategoría
    const subCategory = subCategories.find(
      (subCat) => subCat.name === productData.subCategoryName
    );
    if (subCategory) {
      updatedProduct.subCategoryId = subCategory.subCategory_id;
    }

    // Buscar variedad
    const variety = varieties.find((variety) => variety.name === productData.varietyName);
    if (variety) {
      updatedProduct.varietyId = variety.variety_id;
    }

    setProduct(updatedProduct);
  };


  useEffect(() => {
    setProduct(productData);
  }, [productData]);
  
  useEffect(() => {
    dispatch(fetchAllTags()).then(() => {
      dispatch(fetchProductById(productId));
    });;
  }, [dispatch,productId]);

  
  useEffect(() => {
    // Llamar a assignIdsBasedOnNames cuando los datos del producto y los tags estén listos
    if (productData && categories.length && subCategories.length && varieties.length) {
      assignIdsBasedOnNames();
    }
  }, [productData, categories, subCategories, varieties]);


  // Manejar la eliminación de una imagen existente
  const handleStoredImageRemove = (imageId) => {
    setRemovedImages((prev) => [...prev, imageId]);
    setProduct((prev) => ({
      ...prev,
      imagesList: prev.imagesList.filter((img) => img.imageId !== imageId),
    }));

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
    
    dispatch(updateProduct({token,product,newImages,removedImages}))
    .then(() => {
    dispatch(fetchProducts());})
    .then(()=> {
      navigate('/admin/products');});
  }

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error}</p>;

  if (!product) {
    return <p>No se pudo cargar el producto.</p>; // Evita errores si no hay datos
  }  
  
  
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
          <label className="block text-gray-700">Bebida:</label>
          <select
            value={product.categoryId}
            onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar bebida</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategoría */}
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de bebida:</label>
          <select
            value={product.subCategoryId}
            onChange={(e) => setProduct({ ...product, subCategoryId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar tipo de bebida</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.subCategory_id} value={subCategory.subCategory_id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Variedad */}
        <div className="mb-4">
          <label className="block text-gray-700">Variedad de bebida:</label>
          <select
            value={product.varietyId}
            onChange={(e) => setProduct({ ...product, varietyId: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Seleccionar variedad de bebida</option>
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
