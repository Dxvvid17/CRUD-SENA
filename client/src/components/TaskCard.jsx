import { useTask } from "../context/taskContext";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  // Esto es como luce la tarjeta de tareas

  const { deleteTask } = useTask();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <label className="block text-[#1a237e] text-sm font-medium mb-2">
              Producto:
            </label>
            <h2 className="text-2xl font-bold text-[#1a237e]">{task.nombre}</h2>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              onClick={() => {
                handleDelete(task._id);
              }}
            >
              Borrar
            </button>

            <Link
              to={`/tasks/${task._id}`}
              className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C] transition-colors duration-300"
            >
              Editar
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-[#1a237e] text-sm font-medium mb-2">
              Tipo de tarea:
            </label>
            <p className="text-gray-700">{task.tipoDeTarea}</p>
          </div>
          <div>
            <label className="block text-[#1a237e] text-sm font-medium mb-2">
              Descripción:
            </label>
            <p className="text-gray-700">{task.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
