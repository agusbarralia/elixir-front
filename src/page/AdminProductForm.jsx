import ProductForm from '../components/ProductForm'

function AdminProductForm() {
const baseUrl = 'http://localhost:8080/products/admin';
const token = localStorage.getItem('token');
  return (
    <div>
    <div>AdminProductForm</div>
        <ProductForm baseUrl={baseUrl} token={token}></ProductForm>
    </div>
  )
}

export default AdminProductForm