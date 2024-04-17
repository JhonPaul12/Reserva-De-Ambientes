import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from "../App";
import { AmbientesRegistroPage, Bienvenida,  LoginPage } from '../pages/index.ts';
import { CrearSolicitud } from '../pages/ambientes/CrearSolicitud.tsx';

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


