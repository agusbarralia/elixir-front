import { useSelector } from 'react-redux';
import ProductForm from '../components/ProductForm';

function AdminProductForm() {
  const baseUrl = 'http://localhost:8080/products/admin';
  const { token } = useSelector((state) => state.users);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ProductForm baseUrl={baseUrl} token={token} />
    </div>
  );
}

export default AdminProductForm;