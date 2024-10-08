/* eslint-disable react/prop-types */
import React, { useState } from 'react';

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
    <div className="mb-6">
      <h3 className="text-xl mb-2">{title}</h3>

      {/* Formulario para agregar nuevo elemento */}
      <form onSubmit={handleAddItem} className="mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Nueva ${title.toLowerCase()}`}
          className="px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Agregar {title}</button>
      </form>

      {/* Tabla de elementos existentes */}
      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="py-2 border-b">Nombre</th>
            <th className="py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.name}>
              <td className="py-2 border-b">{item.name}</td>
              <td className="py-2 border-b">
                <button 
                  onClick={() => handleDeleteItem(item.name)} 
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategorySubcategoryVariety;
