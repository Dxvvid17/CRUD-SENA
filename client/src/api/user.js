import axios from "./axios";

export const getAllUsers = async () => axios.get("/users");

export const getUserById = async (id) => axios.get(`/users/${id}`);

export const updateUser = async (id, user) => axios.put(`/users/${id}`, user);

export const deleteUser = async (id) => axios.delete(`/users/${id}`);
