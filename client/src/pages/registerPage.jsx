import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    // SI SE LOGEA, LLEGA LA PÁGINA DE TASKS
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="bg-[#27272a] p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <h2 className="text-3xl font-bold text-[#6366f1]">Task Manager</h2>
          </Link>
        </div>
        {RegisterErrors.map((error, i) => (
          <div
            className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center mb-4 text-red-500"
            key={i}
          >
            {error}
          </div>
        ))}
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Crear cuenta
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username:
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                El username es requerido
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">El email es requerido</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              placeholder="•••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                La contraseña es requerida
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-md hover:shadow-lg"
          >
            Crear cuenta
          </button>

          <p className="text-center text-gray-400 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#6366f1] hover:text-[#4f46e5] font-medium hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
