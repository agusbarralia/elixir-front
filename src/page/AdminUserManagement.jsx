import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Usuario</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.username}>
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
                                    className={`px-4 py-2 rounded-md text-white ${
                                        user.state ? 'bg-red-600' : 'bg-green-600'
                                    } hover:opacity-75`}
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
