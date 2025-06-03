import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id, //Esto se hace con el fin de traer las tareas que solo le pertenecen al usuario
  }).populate("user"); //El populate se aplica para que en vez de traer solo el ID, traiga todos los datos del usuario
  res.json(tasks);
};

export const createTasks = async (req, res) => {
  const { nombre, tipoDeTarea, descripcion, date } = req.body; // Qué es lo que voy a recibir?
  const newTask = new Task({
    // Creo la tarea
    nombre,
    tipoDeTarea,
    descripcion,
    date,
    user: req.user.id, //Esto es para identificar que tarea le pertenece a qué usuario
  });
  const saveTask = await newTask.save(); // Guardo la tarea
  res.json(saveTask); // Muestro lo que guardé al cliente
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id); // Aquí encontramos solo una tarea por el ID

  if (!task) return res.status(404).json({ message: "Task not found" }); // Si no encontró nada, muestra ese mensaje de error
  res.json(task); // Si sí encuentra, muestra la tarea que encontró
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id); // Aquí encontramos la tarea por el ID pero con la propiedad FindAndDelete para borrarla

  if (!task) return res.status(404).json({ message: "Task not found" }); // Si no encuentra la tarea, muestra que no se encontró
  return res.sendStatus(204); // Si sí se encuentra, muestra la tarea que eliminó
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

// IMPORTANTE, COLOCAR TODO ESTO EN TRYCATCH
