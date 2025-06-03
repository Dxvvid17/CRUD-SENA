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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <h2 className="text-3xl font-bold text-[#1a237e] hover:text-[#151b57]">
              Task Manager
            </h2>
          </Link>
        </div>
        {RegisterErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white rounded mb-4" key={i}>
            {error}
          </div>
        ))}
        <h2 className="text-2xl font-bold text-center text-[#1a237e] mb-6">
          Crear cuenta
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1a237e] mb-2">
              Username:
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                El username es requerido
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a237e] mb-2">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
              placeholder="tucorreo@ejemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">El email es requerido</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a237e] mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
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
            className="w-full py-4 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-md hover:shadow-lg"
          >
            Crear cuenta
          </button>

          <p className="text-center text-[#1a237e] mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#1a237e] hover:text-[#388E3C] font-medium hover:underline"
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
