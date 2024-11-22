import { useState, useEffect } from 'react';
import CategorySubcategoryVariety from '../components/CategorySubcategoryVariety';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const {role, token } = useSelector((state) => state.users);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchVarieties();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/subcategories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchVarieties = async () => {
    try {
      const response = await fetch('http://localhost:8080/varieties', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVarieties(data);
    } catch (error) {
      console.error('Error fetching varieties:', error);
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-6">
      <h2 className="text-2xl mb-4">Gestión de Bebidas, Tipos y Variedades</h2>

      {/* Componente de Categoría */}
      <CategorySubcategoryVariety 
        title="Bebidas"
        fetchData={fetchCategories}
        data={categories}
        apiUrl="http://localhost:8080/categories/admin"
      />

      {/* Componente de Subcategoría */}
      <CategorySubcategoryVariety 
        title="Tipos Bebidas"
        fetchData={fetchSubcategories}
        data={subcategories}
        apiUrl="http://localhost:8080/subcategories/admin"
      />

      {/* Componente de Variedad */}
      <CategorySubcategoryVariety 
        title="Variedades Bebidas"
        fetchData={fetchVarieties}
        data={varieties}
        apiUrl="http://localhost:8080/varieties/admin"
      />
    </div>
  );
}

export default AdminCategories;
