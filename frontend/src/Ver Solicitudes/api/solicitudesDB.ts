import axios from "axios";

export const solicitudesDB = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    Accept: "application/json",
  },
});
