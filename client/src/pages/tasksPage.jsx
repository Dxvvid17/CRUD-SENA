import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0)
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">No se encontraron tareas</h1>
      </div>
    );

  return (
    // Esto es como luce la tarjeta de tareas, se importa desde taskcard en el apartado de componentes
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
