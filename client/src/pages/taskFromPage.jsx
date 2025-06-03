import { useForm } from "react-hook-form";
import { useTask } from "../context/taskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFromPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask, errors: taskErrors } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // Esto es para que cuando le presionen el botón de editar
    async function loadTask() {
      // se cargan los datos que estan en la tarea
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("nombre", task.nombre);
        setValue("tipo de tarea", task.tipoDeTarea);
        setValue("descripcion", task.descripcion);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // Aqui evalua si es una tarea nueva o una existente
    if (params.id) {
      // Si hay algo existente, se actualiza
      updateTask(params.id, data); // Si no hay nada, se crea
    } else {
      createTask(data);
    }
    navigate("/tasks"); // Luego de que se crea la tarea o se actualiza, se lleva a la página de tareas
  });

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-md hover:shadow-lg">
        {taskErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white mb-4 rounded" key={i}>
            {error}
          </div>
        ))}
        <h2 className="text-2xl font-bold text-[#1a237e] mb-6 text-center">
          {params.id ? "Editar producto" : "Crear nueva tarea"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#1a237e] mb-2"
            >
              Nombre
            </label>

            <input
              type="text"
              placeholder="Nombre de la tarea"
              {...register("nombre", { required: true })}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
              autoFocus
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">Nombre es requerido</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tipoDeTarea"
              className="block text-sm font-medium text-[#1a237e] mb-2"
            >
              Tipo de tarea
            </label>

            <select
              placeholder="Categoria"
              {...register("tipoDeTarea")}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
            >
              <option value="Recurrente">Recurrente</option>
              <option value="Importante">Importante</option>
              <option value="No importante">No importante</option>
              <option value="Urgente">Urgente</option>
              <option value="No urgente">No urgente</option>
            </select>

            {errors.tipoDeTarea && (
              <p className="text-red-500">El tipo de tarea es requerida</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#1a237e] mb-2"
            >
              Descripcion
            </label>
            <input
              placeholder="Descripcion de la tarea"
              {...register("descripcion", { required: true })}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition-all duration-200 text-[#1a237e] placeholder-[#94A3B8]"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => navigate("/tasks")}
              type="button"
              className="px-4 py-2 bg-[#1a237e] text-white rounded hover:bg-[#151875] transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-[#388E3C] transition-colors duration-300"
              type="submit"
            >
              {params.id ? "Actualizar tarea" : "Guardar tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFromPage;
