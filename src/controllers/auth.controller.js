import User from "../models/user.mode.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// REGISTRAR USUARIO

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["User already exists"]); // si el usuario ya existe, devuelve un error

    const passwordHash = await bcrypt.hash(
      password,
      10
    ); /** <-- Esto es para incriptar la contraseña */

    const newUser = new User({
      username /** <-- Creación de nuevo usuario */,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); // guardas el usuario

    const token = await createAccessToken({ id: userSaved._id }); // creas el token

    res.cookie("token", token); // estableces una cookie en la respuesta
    res.json({
      // envias la respuesta
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USUARIO

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" }); // Usuario no encontrado

    const isMatch = await bcrypt.compare(password, userFound.password); // si lo encuentra, compara las contraseñas

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" }); // Contraseña incorrecta

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CERRAR SESIÓN

export const logout = (req, res) => {
  // Este código es para que el token expire
  // y se cierre la sesión
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });

  res.send("profile");
};

export const verifyToken = async (req, res) => {
  // Este código es para verificar si el token es válido
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    });
  });
};
