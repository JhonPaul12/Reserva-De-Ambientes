import React from "react";
import { Clipboard, House, HouseExclamation, ListTask, People, Search } from "react-bootstrap-icons";

export const slideBarAdmin = [
    {
        path: 'bienvenida',
        name: "INICIO",
        icon: <House/>
    },
    {
        path: 'listaSolicitudes',
        name: "SOLICITUDES",
        icon: <ListTask/>
    },
    {
        path: 'listaDocentes',
        name: "DOCENTES",
        icon: <People/>
    },
    {
        path: 'registroAmbiente',
        name: "AMBIENTES",
        icon: <Clipboard/>
    },

]

export const slideBarDocente = [
    {
        path: 'bienvenida',
        name: "INICIO",
        icon: <HouseExclamation/>
    },
    {
        path: 'listaSolicitudes',
        name: "BUSCAR AMBIENTE",
        icon: <Search/>
    },
    {
        path: 'listaDocentes',
        name: "CREAR SOLICITUD",
        icon: <Clipboard/>
    },
    {
        path: 'registroAmbiente',
        name: "HISTORIAL",
        icon: <ListTask/>
    },

]