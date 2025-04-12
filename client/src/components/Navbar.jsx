import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="flex justify-between items-center p-4 bg-zinc-900 text-white">

            <Link to = {
                isAuthenticated ? '/tasks' : '/'                       // Esto es para que si estoy logeado, cuando clickee me lleve a la pagina de tareas en vez de a la homepage
            }>
                <h1 className="text-3xl font-bold">Task Manager</h1>
            </Link>

            <ul className="flex gap-x-2">
                
                {isAuthenticated ? (
                    <>
                    <li>
                        Bienvenido {user.username}
                    </li>
                    <li>
                        <Link to = '/add-task' className="bg-indigo-500 text-white px-4 py-2 rounded-md my-2">Añade una tarea</Link>
                    </li>
                    <li>
                        <Link to = "/" onClick={() =>{
                            logout();
                        }}>Cerrar sesión</Link>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <Link to = '/login' className="bg-indigo-500 text-white px-4 py-2 rounded-md my-2">Login</Link>
                    </li>
                    <li>
                        <Link to = '/register' className="bg-indigo-500 text-white px-4 py-2 rounded-md my-2">register</Link>  
                    </li>
                    </>
                )}

            </ul>
        </nav>
    )
}

export default navbar;