import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.mode.js";

export const adminRequired = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const userFound = await User.findById(decoded.id);

    if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (userFound.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Acceso denegado: se requiere admin" });
    }
    req.user = userFound;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
