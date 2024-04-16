import axios from "axios";

export const reservasDB = axios.create({
    baseURL: import.meta.env.API_URL,
    headers:{
        Accept: 'application/json'
    }
});
