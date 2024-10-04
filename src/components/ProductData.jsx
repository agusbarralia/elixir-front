import React from 'react'

function ProductData({ category, subCategory, variety, sort, size }) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Categoria</h4>
          <p className="text-gray-600">{category ? category : '-'}</p> 
        </div>
        <div>
          <h4 className="font-semibold">Color</h4>
          <p className="text-gray-600">{subCategory ? subCategory : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Variedad</h4>
          <p className="text-gray-600">{variety ? variety : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Bodega</h4>
          <p className="text-gray-600">{sort ? sort : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Tamaño</h4>
          <p className="text-gray-600">{size ? size : '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductData;
