import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/userContext.jsx";
import { useEffect } from "react";

const AdminFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { updateUserById, getUser, errors: userErrors } = useUser();
  const navigate = useNavigate();
  const params = useParams();

  // Para cuando se presione el boton de editar, cargue los datos del usuario en el formulario
  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("role", user.role);
      }
    }
    loadUser();
  }, [params.id, setValue, getUser]);

  // Para cuando se presione el boton de guardar, guarde los datos del usuario en la base de datos y redireccione a la pagina de admin
  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateUserById(params.id, data);
    }
    navigate("/admin");
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Editar usuario
        </h2>
        {userErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white mb-4" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              {...register("username", { required: true })}
              className="w-full p-2 border rounded"
              autoFocus
            />

            {errors.username && (
              <p className="text-red-500">Este campo es requerido</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Correo</label>
            <input
              type="email"
              placeholder="Correo"
              {...register("email", { required: true })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500">Este campo es requerido</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Rol</label>
            <select
              {...register("role", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && (
              <p className="text-red-500">Este campo es requerido</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFormPage;
