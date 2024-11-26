import { Link } from "react-router-dom";
import { FaProductHunt, FaBox, FaUser, FaListAlt, FaHome } from 'react-icons/fa'; // Iconos de react-icons

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-8 text-center">Panel de Administrador</h1>
        <ul className="space-y-6">
          <li>
            <Link to="/admin/products" className="flex items-center space-x-3 hover:text-gray-300 transition-all duration-300">
              <FaProductHunt size={20} />
              <span className="text-lg">Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="flex items-center space-x-3 hover:text-gray-300 transition-all duration-300">
              <FaBox size={20} />
              <span className="text-lg">Ordenes</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="flex items-center space-x-3 hover:text-gray-300 transition-all duration-300">
              <FaUser size={20} />
              <span className="text-lg">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/category" className="flex items-center space-x-3 hover:text-gray-300 transition-all duration-300">
              <FaListAlt size={20} />
              <span className="text-lg">Categorias</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center space-x-3 hover:text-gray-300 transition-all duration-300">
              <FaHome size={20} />
              <span className="text-lg">Inicio</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
