import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from "../App";
import { AmbientesRegistroPage, Bienvenida,  LoginPage } from '../pages/index.ts';

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


