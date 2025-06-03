import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipoDeTarea: {
      type: String,
      required: true,
      enum: [
        "Recurrente",
        "Importante",
        "No importante",
        "Urgente",
        "No urgente",
      ],
      default: "Recurrente",
    },
    descripcion: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
