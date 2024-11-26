import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtener el estado de autenticación desde Redux
  const { loading, error, role } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Disparar la acción de inicio de sesión
    dispatch(loginUser({ email, password }))
      .unwrap() // Manejar la promesa directamente
      .then(() => {
        // Redirigir según el rol del usuario después de autenticarse
        if (role === "ADMIN") {
          navigate("/admin/products");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        // El error se manejará automáticamente en el slice
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full bg-rose-950 text-white py-2 px-4 rounded-lg hover:bg-rose-700"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">¿No tienes cuenta? <a href="/register" className="text-rose-950">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
