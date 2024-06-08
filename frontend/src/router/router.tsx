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
//import { ModificarSolicitud } from "../ModificarSolicitud/ModificarSolicitud";
import { VerSolicitudes } from "../Ver Solicitudes/VerSolicitudes";
import { CancelarSol } from "../CancelarSolicitud";
import { TodasSolicitudes } from "../Solicitudes";
import { CancelarReservasAdmin } from "../CancelarReservasAdmin";
import { ModificarAmbiente } from "../ModificarAmbiente-Alison/ModificarAmbiente";
import { ReglasAmbientes } from "../ReglasAmbientes/ReglasAmbientes";
import { VerTodasReservasAdmin } from "../ReservasAdmin2/indes";
import { Login } from "../Login/Login";
import { NotificacionesUsuario } from "../Notificaciones";
import { ModificarDocentes } from "../ModificarDocentes/ModificarDocentes";
import { CrearDocente } from "../CrearDocente/CrearDocente";
import { DarDeBaja } from "../DarDeBajaDocente/DarDeBaja";
import { NotificarCancelaciones } from "../NotificarCancelacion";
import { NotificarCancelacionesUbi } from "../NotificarCacelacionUbicacion";
import { CalendarioUser } from "../Calendario";
import { Feriados } from "../RegistrarFeriados/Feriados";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    //Rutas Admin
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
        path: "lista-docentes",
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
      {
        path: "gestion-ambientes",
        element: <ReglasAmbientes />,
      },
      {
        path: "crear-feriados",
        element: <Feriados />,
      },
      {
        path: "modificar-docentes",
        element: <ModificarDocentes />,
      },
      {
        path: "crear-docente",
        element: <CrearDocente />,
      },
      {
        path: "dar-baja-docente",
        element: <DarDeBaja />,
      },
      {
        path: "notificar-ambiente",
        element: <NotificarCancelaciones />,
      },
      {
        path: "notificar-ubicacion",
        element: <NotificarCancelacionesUbi />,
      },
    ],
  },
  //Rutas Usuario
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        path: "solicitar-reserva",
        element: <CreacionSolicitud />,
      },
      {
        path: "visualizar-ambientes",
        element: <BusquedaFil />,
      },
      {
        path: "calendario",
        element: <CalendarioUser />,
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
      {
        path: "notificaciones",
        element: <NotificacionesUsuario />,
      },
    ],
  },
]);
