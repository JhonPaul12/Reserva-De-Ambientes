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
import { CancelarReservasAdmin } from "../CancelarReservasAdmin";
import { ModificarAmbiente } from "../ModificarAmbiente-Alison/ModificarAmbiente";
import { VerTodasReservasAdmin } from "../ReservasAdmin2/indes";

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
            path: "editar-ambientes",
            element: <ModificarAmbiente />,
          },
          {
            path: "filtrar-por-estado",
            element: <SolicitudesAceptadas />,
          },
          {
            path: "reservas",
            element: <VerTodasReservasAdmin />,
          },
          {
            path: "cancelar-reservas",
            element: <CancelarReservasAdmin />,
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
            path: "crear-reserva",
            element: <CreacionSolicitud />,
          },
          {
            path: "visualizar-ambientes",
            element: <BusquedaFil />,
          },
          //{
          //  path: "modificar-solicitud",
          //  element: <ModificarSolicitud />,
          //},
          {
            path: "lista-solicitudes",
            element: <VerSolicitudes />,
          },
          {
            path: "cancelar-reserva",
            element: <CancelarSol />,
          },
          {
            path: "reservas",
            element: <TodasSolicitudes />,
          },
        ],
      },
    ],
  },
]);
