import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "developement"? "http://localhost:8080/api": "/api",
  // When we send request, cookies should be included for authentication
  withCredentials: true,
});
