import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // backend root
    withCredentials: true, // JWT cookies allowed
});

export default api;
