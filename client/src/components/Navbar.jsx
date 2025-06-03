import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-[#1a1a1a] border-b border-[#27272a] px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to={
            isAuthenticated ? "/tasks" : "/" // Esto es para que si estoy logeado, cuando clickee me lleve a la pagina de tareas en vez de a la homepage
          }
        >
          <h1 className="text-3xl font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
            Task Manager
          </h1>
        </Link>

        <ul className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <li className="text-gray-300">
                Bienvenido{" "}
                <span className="text-[#6366f1] font-semibold">
                  {user.username}
                </span>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="bg-[#6366f1] text-white px-4 py-2 rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg"
                >
                  Tareas
                </Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="bg-[#6366f1] text-white px-4 py-2 rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg"
                  >
                    Administración
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/add-task"
                  className="bg-[#6366f1] text-white px-4 py-2 rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg"
                >
                  Añadir tarea
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cerrar sesión
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-[#6366f1] hover:text-[#4f46e5] font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-[#6366f1] text-white px-4 py-2 rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg"
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default navbar;
