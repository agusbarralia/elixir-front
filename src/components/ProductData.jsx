import React from 'react'

function ProductData({ type, color, variety, sort, size }) {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Type</h4>
          <p className="text-gray-600">{type ? type : '-'}</p> 
        </div>
        <div>
          <h4 className="font-semibold">Color</h4>
          <p className="text-gray-600">{color ? color : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Variety</h4>
          <p className="text-gray-600">{variety ? variety : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Sort</h4>
          <p className="text-gray-600">{sort ? sort : '-'}</p>
        </div>
        <div>
          <h4 className="font-semibold">Size</h4>
          <p className="text-gray-600">{size ? size : '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductData;
