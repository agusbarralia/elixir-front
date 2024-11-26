import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/userSlice'; // Asegúrate de que esta importación es correcta

function Register() {
  const dispatch = useDispatch(); // Hook para despachar acciones
  const navigate = useNavigate(); // Hook para redireccionar

  const { loading, error, token, role } = useSelector((state) => state.users); // Obtenemos el estado del store

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crear el objeto de usuario para enviar al backend
    const user = {
      firstname,
      lastname,
      email,
      password,
    };

    // Despachar la acción de registro
    dispatch(registerUser(user));
  };

  // Usamos useEffect para redirigir después de que el estado cambie
  useEffect(() => {
    if (role === 'ADMIN') {
      navigate('/admin');
    } else if (role === 'USER' && token) {
      navigate('/');
    }
  }, [role, token, navigate]); // Solo se ejecuta cuando 'role' o 'token' cambian

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-950"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
            <input
              type="text"
              id="lastname"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-950"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-950"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-950"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-rose-950 text-white py-2 px-4 rounded-lg hover:bg-rose-700">
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">¿Ya tienes cuenta? <a href="/login" className="text-rose-950">Iniciar Sesión</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
