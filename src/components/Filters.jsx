import React from 'react'

function Filters() {
  return (
    <div className="w-1/4 p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          {}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Precio</h4>
            <input type="range" min="0" max="5000" />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Color</h4>
            <div>
              <label><input type="checkbox" /> Blanco</label>
            </div>
            <div>
              <label><input type="checkbox" /> Tinto</label>
            </div>
          </div>
        </div>
  )
}

export default Filters