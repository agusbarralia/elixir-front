import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Panel de Administrador</h1>
        <ul>
          <li className="mb-4">
            <Link to="/admin/products" className="hover:text-gray-300">Productos</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/orders" className="hover:text-gray-300">Ordenes</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="hover:text-gray-300">Usuarios</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/category" className="hover:text-gray-300">Categorias</Link>
          </li>
          <li className="mb-4">
            <Link to="/" className="hover:text-gray-300">Inicio</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
