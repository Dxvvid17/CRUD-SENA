// ESTO ES LA CONEXIÓN A LA API DEL BACKEND DESDE EL FRONTEND

import axios from "./axios";

const API = "http://localhost:4000/api";

export const registerRequest = user => axios.post(`/register`, user);	

export const loginRequest = user => axios.post(`/login`, user);	

export const verifyTokenRequest = () => axios.get('/verify');
