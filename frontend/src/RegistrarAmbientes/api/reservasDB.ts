import axios from "axios";

export const reservasDB = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    Accept: "application/json",
  },
});
