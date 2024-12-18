import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Obtener el token de autenticación y el rol del local storage

  const { token, role } = useSelector((state) => state.users);

  // Verificar si el usuario está autenticado y tiene el rol de admin
  if (!token || role !== 'ADMIN') {
    // Si no está autenticado o no es admin, redirigir al login
    return <Navigate to="/login" />;
  }

  // Si está autenticado y es admin, mostrar el contenido
  return children;
};

export default ProtectedAdminRoute;
