import React, { useEffect, useState } from 'react';

function Filters({ products, setFilteredProducts }) {
  const [subcategories, setSubcategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedVarieties, setSelectedVarieties] = useState([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const uniqueSubcategories = [...new Set(products.map(product => product.subCategoryName))];
    const uniqueVarieties = [...new Set(products.map(product => product.varietyName))];

    setSubcategories(uniqueSubcategories);
    setVarieties(uniqueVarieties);

    applyFilters(selectedSubcategories, selectedVarieties, priceRange, sortOrder);
  }, [products]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubcategoryChange = (subcategory) => {
    let updatedSelectedSubcategories = [...selectedSubcategories];
    if (updatedSelectedSubcategories.includes(subcategory)) {
      updatedSelectedSubcategories = updatedSelectedSubcategories.filter(item => item !== subcategory);
    } else {
      updatedSelectedSubcategories.push(subcategory);
    }
    setSelectedSubcategories(updatedSelectedSubcategories);
    applyFilters(updatedSelectedSubcategories, selectedVarieties, priceRange, sortOrder);
  };

  const handleVarietyChange = (variety) => {
    let updatedSelectedVarieties = [...selectedVarieties];
    if (updatedSelectedVarieties.includes(variety)) {
      updatedSelectedVarieties = updatedSelectedVarieties.filter(item => item !== variety);
    } else {
      updatedSelectedVarieties.push(variety);
    }
    setSelectedVarieties(updatedSelectedVarieties);
    applyFilters(selectedSubcategories, updatedSelectedVarieties, priceRange, sortOrder);
  };

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value, 10);
    setPriceRange(newPrice);
    applyFilters(selectedSubcategories, selectedVarieties, newPrice, sortOrder);
  };

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    applyFilters(selectedSubcategories, selectedVarieties, priceRange, newSortOrder);
  };

  const applyFilters = (subcategories, varieties, price, sortOrder) => {
    let filtered = products;

    if (subcategories.length > 0) {
      filtered = filtered.filter(product => subcategories.includes(product.subCategoryName));
    }
    if (varieties.length > 0) {
      filtered = filtered.filter(product => varieties.includes(product.varietyName));
    }

    if (price > 0) {
      filtered = filtered.filter(product => {
        const discount = product.discount || 0;
        const discountedPrice = discount > 0 ? (product.price * (1 - discount)).toFixed(2) : product.price;
        return discountedPrice <= price;
      });
    }

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => {
        const priceA = a.price - (a.discount ? a.price * a.discount : 0);
        const priceB = b.price - (b.discount ? b.price * b.discount : 0);
        return priceA - priceB;
      });
    } else {
      filtered = filtered.sort((a, b) => {
        const priceA = a.price - (a.discount ? a.price * a.discount : 0);
        const priceB = b.price - (b.discount ? b.price * b.discount : 0);
        return priceB - priceA;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="w-full md:w-1/4 p-6 bg-white border border-gray-200">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 uppercase tracking-wide text-left">
        Filtros
      </h3>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-lg text-gray-700 border-b-2 border-rose-950 pb-1 uppercase tracking-wide">
          Tipos de Bebidas
        </h4>
        {subcategories.length > 0 ? (
          subcategories.map(subcategory => (
            <div key={subcategory} className="flex items-center mb-3">
              <label className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(subcategory)}
                  onChange={() => handleSubcategoryChange(subcategory)}
                  className="form-checkbox h-4 w-4 text-rose-950 mr-2"
                />
                {capitalizeFirstLetter(subcategory)}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay Tipos de Bebidas disponibles.</p>
        )}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-lg text-gray-700 border-b-2 border-rose-950 pb-1 uppercase tracking-wide">
          Variedades
        </h4>
        {varieties.length > 0 ? (
          varieties.map(variety => (
            <div key={variety} className="flex items-center mb-3">
              <label className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800">
                <input
                  type="checkbox"
                  checked={selectedVarieties.includes(variety)}
                  onChange={() => handleVarietyChange(variety)}
                  className="form-checkbox h-4 w-4 text-rose-950 mr-2"
                />
                {capitalizeFirstLetter(variety)}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay variedades disponibles.</p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-3 text-lg text-gray-700 border-b-2 border-rose-950 pb-1 uppercase tracking-wide">
          Ordenar por Precio
        </h4>

        <h4 className="font-semibold mb-3 text-lg text-gray-700">
          Precio Máximo: <span className="font-bold text-gray-800">${priceRange}</span>
        </h4>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full appearance-none bg-gray-300 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-rose-950"
          style={{ accentColor: '#7e1414' }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$0</span>
          <span>$50,000</span>
        </div>
      </div>

      <div className="mb-4">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 mb-4"
        >
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
