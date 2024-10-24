import React, { useEffect, useState } from 'react';

function Filters({ products, setFilteredProducts }) {
  const [subcategories, setSubcategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedVarieties, setSelectedVarieties] = useState([]);
  const [priceRange, setPriceRange] = useState(50000); // Estado para reflejar el valor del slider

  // Extraer subcategorías y variedades únicas al recibir los productos
  useEffect(() => {
    const uniqueSubcategories = [...new Set(products.map(product => product.subCategoryName))];
    const uniqueVarieties = [...new Set(products.map(product => product.varietyName))];

    setSubcategories(uniqueSubcategories);
    setVarieties(uniqueVarieties);

    // Aplicar filtros al cargar productos por primera vez
    applyFilters(selectedSubcategories, selectedVarieties, priceRange);
  }, [products]);

  // Manejar el cambio de selección en subcategorías
  const handleSubcategoryChange = (subcategory) => {
    let updatedSelectedSubcategories = [...selectedSubcategories];
    if (updatedSelectedSubcategories.includes(subcategory)) {
      updatedSelectedSubcategories = updatedSelectedSubcategories.filter(item => item !== subcategory);
    } else {
      updatedSelectedSubcategories.push(subcategory);
    }
    setSelectedSubcategories(updatedSelectedSubcategories);
    applyFilters(updatedSelectedSubcategories, selectedVarieties, priceRange);
  };

  // Manejar el cambio de selección en variedades
  const handleVarietyChange = (variety) => {
    let updatedSelectedVarieties = [...selectedVarieties];
    if (updatedSelectedVarieties.includes(variety)) {
      updatedSelectedVarieties = updatedSelectedVarieties.filter(item => item !== variety); // Corrección aquí
    } else {
      updatedSelectedVarieties.push(variety);
    }
    setSelectedVarieties(updatedSelectedVarieties);
    applyFilters(selectedSubcategories, updatedSelectedVarieties, priceRange);
  };

  // Manejar el cambio de selección en el rango de precios
  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value, 10);
    setPriceRange(newPrice);
    applyFilters(selectedSubcategories, selectedVarieties, newPrice);
  };

  // Aplicar los filtros en base a las subcategorías, variedades y el precio máximo seleccionado
  const applyFilters = (subcategories, varieties, price) => {
    let filtered = products;

    if (subcategories.length > 0) {
      filtered = filtered.filter(product => subcategories.includes(product.subCategoryName));
    }
    if (varieties.length > 0) {
      filtered = filtered.filter(product => varieties.includes(product.varietyName));
    }

    // Filtrar por precio teniendo en cuenta el descuento
    if (price > 0) {
      filtered = filtered.filter(product => {
        const discount = product.discount || 0; // Si no tiene descuento, se toma como 0.
        const discountedPrice = discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;
        return discountedPrice <= price; // Comparar con el precio después de aplicar el descuento
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="w-1/4 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-center">Filtros</h3>
      
      {/* Filtros de Subcategoría */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Tipos de Bebidas</h4>
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center mb-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={() => handleSubcategoryChange(subcategory)}
                  className="mr-2"
                />
                {subcategory}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay Tipos de Bebidas disponibles.</p>
        )}
      </div>

      {/* Filtros de Variedad */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Variedades</h4>
        {varieties.length > 0 ? (
          varieties.map((variety) => (
            <div key={variety} className="flex items-center mb-1">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedVarieties.includes(variety)}
                  onChange={() => handleVarietyChange(variety)}
                  className="mr-2"
                />
                {variety}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay variedades disponibles.</p>
        )}
      </div>

      {/* Slider para filtrar por precio máximo */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Precio Máximo: <span className="font-bold">${priceRange}</span></h4>
        <input
          type="range"
          min="0"
          max="50000" // Valor máximo del filtro.
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default Filters;
