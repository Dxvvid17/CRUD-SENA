import { useTask } from "../context/taskContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  // Esto es como luce la tarjeta de tareas

  const { deleteTask } = useTask();

  return (
    <div className="bg-[#27272a] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] max-w-md w-full">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <label className="text-gray-400 text-sm">Producto:</label>

            <h2 className="text-2xl font-bold text-[#6366f1] mt-1">
              {task.nombre}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              className="text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg transition-colors duration-300"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Borrar
            </button>

            <button className="text-[#6366f1] hover:text-[#4f46e5] bg-[#6366f1]/10 hover:bg-[#6366f1]/20 px-3 py-2 rounded-lg transition-colors duration-300">
              <Link to={`/tasks/${task._id}`}> Editar </Link>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <label className="text-gray-400 text-sm block">Categoria:</label>

            <p className="text-white mt-1">{task.categoria}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm block">Precio:</label>
            <p className="text-white mt-1">{task.precio}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm block">Stock:</label>
            <p className="text-white mt-1">{task.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
