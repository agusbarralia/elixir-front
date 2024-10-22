/* eslint-disable react/prop-types */
import { useState } from 'react';

function CategorySubcategoryVariety({ title, fetchData, data, apiUrl }) {
  const [newItem, setNewItem] = useState('');
  const token = localStorage.getItem('token');

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/${newItem}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNewItem('');
      fetchData(); // Recargar datos
    } catch (error) {
      console.error(`Error creating ${title.toLowerCase()}:`, error);
    }
  };

  const handleDeleteItem = async (itemName) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la ${title.toLowerCase()} "${itemName}"?`);
    if (!confirmDelete) return;

    try {
      await fetch(`${apiUrl}/${itemName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchData(); // Recargar datos después de eliminar
    } catch (error) {
      console.error(`Error deleting ${title.toLowerCase()}:`, error);
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>

      {/* Formulario para agregar nuevo elemento */}
      <form onSubmit={handleAddItem} className="mb-4 flex">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Nueva ${title.toLowerCase()}`}
          className="flex-grow px-4 py-2 border border-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">
          Agregar {title}
        </button>
      </form>

      {/* Tabla de elementos existentes */}
      <table className="min-w-full bg-white border border-gray-300 mb-6 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 border-b text-left px-4">Nombre</th>
            <th className="py-2 border-b text-left px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(item => (
              <tr key={item.name} className="hover:bg-gray-100 transition-colors">
                <td className="py-2 border-b px-4">{item.name}</td>
                <td className="py-2 border-b px-4">
                  <button 
                    onClick={() => handleDeleteItem(item.name)} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-2 text-center">No hay elementos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategorySubcategoryVariety;
