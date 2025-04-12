import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {

    const { getTasks, tasks } = useTask();
    
    useEffect(() => {
        getTasks();
    }, [])

    if (tasks.length === 0) return <h1>No tasks found</h1>;

    return (                    // Esto es como luce la tarjeta de tareas, se importa desde taskcard en el apartado de componentes
        <div className="grid grid-cols-3 gap-2 my-2">
            {
                tasks.map(task => (
                    <TaskCard task={ task } key = {task._id} />
                ))
            }
        </div>
    )
}

export default TasksPage;