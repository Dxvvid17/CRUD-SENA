import { z } from "zod"; //ESTE ARCHIVO ES PARA HACER VALIDACIONES AL BACKEND, LO MISMO LA LIBRERIA ZOD

export const taskSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  categoria: z.string({
    required_error: "Categoria es requerida",
  }),
  stock: z.string({
    required_error: "Stock es requerido",
  }),
});
