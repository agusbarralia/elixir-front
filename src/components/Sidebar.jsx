
function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Panel de Administrador</h1>
          <ul>
            
            <li className="mb-4">
              <a href="/admin/products" className="hover:text-gray-300">Productos</a>
            </li>
            <li className="mb-4">
              <a href="/admin/orders" className="hover:text-gray-300">Ordenes</a>
            </li>
            <li className="mb-4">
              <a href="/admin/users" className="hover:text-gray-300">Usuarios</a>
            </li>
            <li className="mb-4">
              <a href="/admin/category" className="hover:text-gray-300">Categorias</a>
            </li>
            <li className="mb-4">
              <a href="/" className="hover:text-gray-300">Inicio</a>
            </li>
          </ul>
        </div>
      </div>  
)
}

export default Sidebar