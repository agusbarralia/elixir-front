import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/userSlice';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.users)

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                dispatch(logoutUser()); // Disparar acción de cerrar sesión
                navigate('/login');
                return;
            }

            if (!response.ok) throw new Error('Error fetching users');

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleUserState = async (user) => {
        try {
            const UserFormData = new FormData();
            UserFormData.append('userId', user.id);

            const response = await fetch('http://localhost:8080/users/admin/changeState', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: UserFormData,
            });

            if (!response.ok) throw new Error('Error updating user state');
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Usuarios</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2 text-left">Usuario</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Nombre</th>
                        <th className="border px-4 py-2 text-left">Apellido</th>
                        <th className="border px-4 py-2 text-left">Estado</th>
                        <th className="border px-4 py-2 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username} className="hover:bg-gray-100 transition duration-200">
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.last_name}</td>
                            <td className="border px-4 py-2">
                                {user.state ? 'Activo' : 'Inactivo'}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => toggleUserState(user)}
                                    className={`px-4 py-2 rounded-md text-white transition duration-200 
                                    ${user.state ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    {user.state ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserManagement;
