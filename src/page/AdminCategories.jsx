import { useEffect } from 'react';
import CategorySubcategoryVariety from '../components/CategorySubcategoryVariety';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTags } from '../redux/tagsSlice';

function AdminCategories() {
  const {token } = useSelector((state) => state.users);
  const {categoriesItems: categories,subcategoriesItems: subcategories,varietiesItems: varieties,loading,error} = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      dispatch(fetchAllTags());
    }
  }, [token,dispatch]);

  if (loading) {
    return <p>Cargando Datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="flex-1 bg-gray-100 p-6">
      <h2 className="text-2xl mb-4">Gestión de Bebidas, Tipos y Variedades</h2>

      <CategorySubcategoryVariety 
        title="Bebidas"
        data={categories}
      />

      <CategorySubcategoryVariety 
        title="Tipos Bebidas"
        data={subcategories}
      />

      <CategorySubcategoryVariety 
        title="Variedades Bebidas"
        data={varieties}
      />
    </div>
  );
}

export default AdminCategories;
