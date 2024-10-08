import React, { useState, useEffect } from 'react';
import CategorySubcategoryVariety from '../components/CategorySubcategoryVariety';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const token = localStorage.getItem('token');

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
      <h2 className="text-2xl mb-4">Gestión de Categorías, Subcategorías y Variedades</h2>

      {/* Componente de Categoría */}
      <CategorySubcategoryVariety 
        title="Categorías"
        fetchData={fetchCategories}
        data={categories}
        apiUrl="http://localhost:8080/categories/admin"
      />

      {/* Componente de Subcategoría */}
      <CategorySubcategoryVariety 
        title="Subcategorías"
        fetchData={fetchSubcategories}
        data={subcategories}
        apiUrl="http://localhost:8080/subcategories/admin"
      />

      {/* Componente de Variedad */}
      <CategorySubcategoryVariety 
        title="Variedades"
        fetchData={fetchVarieties}
        data={varieties}
        apiUrl="http://localhost:8080/varieties/admin"
      />
    </div>
  );
}

export default AdminCategories;
