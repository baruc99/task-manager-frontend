import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true, // si usas cookies con Sanctum
});

export default api;
