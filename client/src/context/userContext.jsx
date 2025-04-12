import React, { createContext, useContext, useState } from "react";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../api/user.js";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      setErrors("Error al obtener usuarios", error.response.data);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await getUserById(id);
      return response.data;
    } catch (error) {
      setErrors(["Error al obtener usuario"]);
    }
  };

  const updateUserById = async (id, user) => {
    try {
      const response = await updateUser(id, user);
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteUserById = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 204)
        setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        errors,
        getUsers,
        getUser,
        updateUserById,
        deleteUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
