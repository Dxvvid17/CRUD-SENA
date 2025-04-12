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
    <div className="bg-zinc-900 max-w-md w-full p-10 rounded-md">
      {taskErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <label htmlFor="title" className="text-white">
          Nombre
        </label>

        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        {errors.nombre && <p className="text-red-500">Nombre es requerido</p>}

        <label htmlFor="Categoria" className="text-white">
          Categoria
        </label>
        <input
          placeholder="Categoria"
          {...register("categoria")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></input>

        {errors.categoria && (
          <p className="text-red-500">Categoria es requerida</p>
        )}
        <label htmlFor="precio" className="text-white">
          Precio
        </label>
        <input
          placeholder="Precio"
          {...register("precio")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></input>
        <label htmlFor="stock" className="text-white">
          Stock
        </label>
        <input
          placeholder="Stock"
          {...register("stock")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></input>

        {errors.stock && <p className="text-red-500">Stock es requerido</p>}

        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md my-2"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskFromPage;
