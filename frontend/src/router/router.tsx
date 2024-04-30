import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PrincipalPage } from "../pages";
import { RootLayout, UserLayout } from "../layouts";
import { Reglas } from "../AsinarReglas/Reglas";
import { RegistroAmbiente } from "../RegistrarAmbientes/RegistroAmbiente";
import { VerAmbientes } from "../VerAmbientes/VerAmbientes";
import { CreacionSolicitud } from "../CrearSolicitud/CreacionSolicitud";
import { BusquedaFil } from "../BusquedaFiltros";
import { SolicitudesAceptadas } from "../VisualizarSolicitudesAcp/SolicitudesAceptadas";
import { ModificarSolicitud } from "../ModificarSolicitud/ModificarSolicitud";
import { VerSolicitudes } from "../Ver Solicitudes/VerSolicitudes";
import { CancelarSol } from "../CancelarSolicitud";
import { TodasSolicitudes } from "../Solicitudes";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      //Rutas Admin
      {
        path: "admin",
        element: <RootLayout />,
        children: [
          {
            path: "inicio",
            element: <PrincipalPage />,
          },
          {
            path: "asignar-reglas",
            element: <Reglas />,
          },
          {
            path: "registrar-ambiente",
            element: <RegistroAmbiente />,
          },
          {
            path: "ambientes-registrados",
            element: <VerAmbientes />,
          },
          {
            path: "solicitudes-aceptadas",
            element: <SolicitudesAceptadas/>,
          },
        ],
      },
      //Rutas Auth
      //Rutas Usuario
      {
        path: "user",
        element: <UserLayout />,
        children: [
          {
            path: "crear-solicitud",
            element: <CreacionSolicitud />,
          },
          {
            path: "visualizar-ambientes",
            element: <BusquedaFil/>,
          },
          {
            path: "modificar-solicitud",
            element: <ModificarSolicitud />,
          },
          {
            path: "lista-solicitudes",
            element: <VerSolicitudes />,
          },
          {
            path: "cancelar-solicitud",
            element: <CancelarSol />,
          },
          {
            path: "solicitudes",
            element: <TodasSolicitudes />,
          },
        ],
      },
    ],
  },
]);
