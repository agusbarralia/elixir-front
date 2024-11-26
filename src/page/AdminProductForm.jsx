import { useSelector } from 'react-redux';
import ProductForm from '../components/ProductForm'


function AdminProductForm() {
const baseUrl = 'http://localhost:8080/products/admin';
const {token} = useSelector((state)=> state.users)

return (
    <div>
        <ProductForm baseUrl={baseUrl} token={token}></ProductForm>
    </div>
  )
}

export default AdminProductForm