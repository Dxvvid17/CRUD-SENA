import { z } from "zod"; //ESTE ARCHIVO ES PARA HACER VALIDACIONES AL BACKEND, LO MISMO LA LIBRERIA ZOD

export const taskSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  descripcion: z.string({
    required_error: "Descripcion es requerido",
  }),
  tipoDeTarea: z.string({
    required_error: "Tipo de tarea es requerido",
  }),
});

// sadsad
