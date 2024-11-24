/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, createSubCategory, createVarieties, deleteCategory, deleteSubCategory, deleteVarieties } from '../redux/tagsSlice';

function CategorySubcategoryVariety({ title, data}) {
  const [newItem, setNewItem] = useState('');
  const {token} = useSelector((state)=> state.users);
  const {loading,error} = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  const handleAddItem = async (e) => {
    e.preventDefault();
    if(title == "Bebidas"){
    dispatch(createCategory({newItem,token}));
  } else if(title == "Tipos Bebidas"){
    dispatch(createSubCategory({newItem,token}));
  }else if(title == "Variedades Bebidas"){
    dispatch(createVarieties({newItem,token}));
  }
  };

  const handleDeleteItem = async (itemName) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la ${title.toLowerCase()} "${itemName}"?`);
    if (!confirmDelete) return;

    if(title == "Bebidas"){
      dispatch(deleteCategory({itemName,token}))
    } else if(title == "Tipos Bebidas"){
      dispatch(deleteSubCategory({itemName,token}));
    }else if(title == "Variedades Bebidas"){
      dispatch(deleteVarieties({itemName,token}));
    }

  };

  if(loading){
    <p>Cargando...</p>
  }
  if(error){
    <p>Error: {error}</p>
  }

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
