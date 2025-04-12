import React, { useEffect } from "react";
import { useUser } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { users, getUsers, deleteUserById, errors } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
    }
  };

  if (errors.length && !errors.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );

  if (errors.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {errors.join(", ")}
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Panel de Administración
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{user._id}</td>
                <td className="py-4 px-6">{user.username}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => navigate(`/admin/edit/${user._id}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
