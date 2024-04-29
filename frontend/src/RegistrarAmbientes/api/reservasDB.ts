import axios from "axios";

export const reservasDB = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers:{
        Accept: 'application/json'
    }
});
