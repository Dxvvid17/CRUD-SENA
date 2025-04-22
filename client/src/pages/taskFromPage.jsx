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
        setValue("categoria", task.categoria);
        setValue("precio", task.precio);
        setValue("stock", task.stock);
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
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="bg-[#27272a] max-w-md w-full p-8 rounded-2xl shadow-2xl">
        {taskErrors.map((error, i) => (
          <div
            className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center mb-4 text-red-500"
            key={i}
          >
            {error}
          </div>
        ))}
        <h2 className="text-2xl font-bold text-[#6366f1] mb-6 text-center">
          {params.id ? "Editar producto" : "Crear nuevo producto"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Nombre
            </label>

            <input
              type="text"
              placeholder="Nombre del producto"
              {...register("nombre", { required: true })}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              autoFocus
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">Nombre es requerido</p>
            )}
          </div>

          <div className="block text-sm font-medium text-gray-300 mb-2">
            <label htmlFor="Categoria" className="text-white">
              Categoria
            </label>
            <input
              placeholder="Categoria"
              {...register("categoria")}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            ></input>

            {errors.categoria && (
              <p className="text-red-500">Categoria es requerida</p>
            )}
          </div>
          <div>
            <label
              htmlFor="precio"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Precio
            </label>
            <input
              placeholder="Precio del producto"
              {...register("precio")}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            ></input>
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Stock
            </label>
            <input
              placeholder="Stock disponible"
              {...register("stock")}
              className="w-full p-3 bg-[#3f3f46] border border-[#6366f1]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            ></input>

            {errors.stock && <p className="text-red-500">Stock es requerido</p>}
          </div>

          <button
            className="w-full py-4 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-md hover:shadow-lg mt-6"
            type="submit"
          >
            {/* Aquí se muestra el botón de guardar o actualizar */}
            {params.id ? "Actualizar producto" : "Guardar producto"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFromPage;
