import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from "../App";
import { AmbientesRegistroPage, Bienvenida,  LoginPage, ListaAceptadas } from '../pages/index.ts';
import { CrearSolicitud } from '../pages/solicitud/CrearSolicitud.tsx';

export const router = createBrowserRouter([
    {
        element: <App/>,
        path: '/',
        children:[
            {
                 path: '/', 
                 children: [
                    {
                       path: 'registroAmbiente',
                       element: <AmbientesRegistroPage/>
                    },
                    {
                        path: 'crearsolicitud',
                        element: <CrearSolicitud/>
                     },
                     {
                        path: 'listaSolicitudes/aceptadas',
                        element: <ListaAceptadas/>
                     }
                 ]
            }, 
            {
                path:'auth',
                children: [
                    {
                        path:'login',
                        element: <LoginPage/>
                    },
                    {
                        path: 'bienvenida',
                        element: <Bienvenida/>
                    }
                ]
            }
        ]
    }
]);


