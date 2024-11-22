import React from 'react';
import { useSelector } from 'react-redux';

function ProductData() {
  const product = useSelector((state) => state.products.selectedProduct); // Ajustar según la estructura
  const { categoryName, subCategoryName, varietyName, sort, size } = product || {};

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Bebida</h4>
          <p className="text-gray-600">{categoryName || '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Tipo de Bebida</h4>
          <p className="text-gray-600">{subCategoryName || '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Variedad</h4>
          <p className="text-gray-600">{varietyName || '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Bodega</h4>
          <p className="text-gray-600">{sort || '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Tamaño</h4>
          <p className="text-gray-600">{size || '-'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductData;
