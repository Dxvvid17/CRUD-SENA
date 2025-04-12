import { useTask } from "../context/taskContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  // Esto es como luce la tarjeta de tareas

  const { deleteTask } = useTask();

  return (
    <div className="bg-zinc-800 p-4 rounded-md max-w-md w-full">
      <label className="text-1xl font-bold text-white">Producto:</label>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{task.nombre}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md my-2"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Borrar
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-2">
            <Link to={`/tasks/${task._id}`}> Editar </Link>
          </button>
        </div>
      </header>
      <label className="text-1xl font-bold text-white">Categoria:</label>
      <p className="text-slate-300">{task.categoria}</p>
      <label className="text-1xl font-bold text-white">Precio:</label>
      <p className="text-slate-300">{task.precio}</p>
      <label className="text-1xl font-bold text-white">Stock:</label>
      <p className="text-slate-300">{task.stock}</p>
    </div>
  );
}

export default TaskCard;
