import User from "../models/user.mode.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: " Error al obtener usuarios ", error: error.message });
  }
};

// Obtener un usuario por ID

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user); // Aquí devuelves el usuario encontrado en formato JSON
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener usuario", error: error.message });
  }
};

// Actualizar un usuario

export const updateUser = async (req, res) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      select: "-password",
    });
    if (!userUpdated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(userUpdated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar un usuario

export const deleteUser = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);

    if (!userDeleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};
