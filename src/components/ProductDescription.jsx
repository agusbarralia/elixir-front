import { useSelector } from 'react-redux';

function ProductDescription() {
  const product = useSelector((state) => state.products.selectedProduct); // Ajustar según la estructura
  const { name, brand, productDescription } = product || {};
  
  return (
    <div>
      <h2 className="text-3xl font-bold pt-20">{name || 'Título no disponible'}</h2>
      <h3 className="text-xl text-gray-600 mb-4">{brand || 'Marca no disponible'}</h3>
      <p className="text-gray-700 mb-4 pt-5 pr-20 text-justify">
        {productDescription || 'Descripción no disponible'}
      </p>
    </div>
  );
}

export default ProductDescription;
