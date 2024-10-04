import React from 'react'

function ProductDescription({title,brand,description}) {
  return (
    <div>
    <h2 className="text-3xl font-bold pt-20">{title}</h2>
    <h3 className="text-xl text-gray-600 mb-4">{brand}</h3>
    <p className="text-gray-700 mb-4 pt-5 pr-20 text-justify">
    {description}
    </p>
  </div>
  )
}

export default ProductDescription