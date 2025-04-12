import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser"; //Esto es para podamos leer las cookies en json
import cors from "cors"; //Esto es para que podamos hacer peticiones a la api desde otros dominios, por ejemplo desde el dominio del frontend
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", //Este es el dominio del frontend que queremos que nos permita hacer peticiones a la api
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

export default app;
