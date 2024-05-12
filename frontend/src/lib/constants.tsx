import { LuHome, LuLayers, LuUserCircle2 } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";

export const sideMenuOptions = [
  {
    path: "inicio",
    name: "Inicio",
    icon: <LuHome />,
  },
  {
    path: "Solicitudes",
    name: "Solicitudes",
    submenu: true,
    icon: <LuLayers />,
    subMenuOptions: [
      {
        path: "filtrar-por-estado",
        name: "Filtrar por estado",
      },
    ],
  },
  {
    path: "Docentes",
    name: "Docentes",
    submenu: true,
    icon: <LuUserCircle2 />,
    subMenuOptions: [
      {
        path: "lista-docentes",
        name: "Docentes Registrados",
      },
      {
        path: "modificar-docentes",
        name: "Modificar Docentes",
      },
      {
        path: "crear-docente",
        name: "Crear Docente ",
      },
    ],
  },
  {
    path: "Ambientes",
    name: "Ambientes",
    submenu: true,
    icon: <BsBuildingsFill />,
    subMenuOptions: [
      {
        path: "registrar-ambiente",
        name: "Registrar Ambientes",
      },
      {
        path: "asignar-reglas",
        name: "Asignar reglas ",
      },
      {
        path: "ambientes-registrados",
        name: "Ambientes Registrados",
      },
      {
        path: "editar-ambientes",
        name: "Editar Ambientes ",
      },
    ],
  },
];

export const sideMenuOptionsUser = [
  {
    path: "inicio",
    name: "Inicio",
    icon: <LuHome />,
  },
  {
    path: "visualizar-ambientes",
    name: "Ver Ambientes",
    icon: <LuLayers />,
  },
  {
    path: "solicitudes",
    name: "Solicitudes",
    submenu: true,
    icon: <LuUserCircle2 />,
    subMenuOptions: [
      {
        path: "solicitudes",
        name: "Solicitudes",
      },
      // {
      //   path: "lista-solicitudes",
      //   name: "Ver Solicitudes",
      // },
      {
        path: "modificar-solicitud",
        name: "Modificar Solicitud",
      },
      {
        path: "cancelar-solicitud",
        name: "Cancelar Solicitud",
      },
      {
        path: "crear-solicitud",
        name: "Crear Solicitud ",
      },
    ],
  },
  {
    path: "historial",
    name: "Historial",
    submenu: false,
    icon: <BsBuildingsFill />,
    subMenuOptions: [
      {
        path: "ambientes-registrado",
        name: "Ambientes Registrados",
      },
      {
        path: "registrar-ambientes",
        name: "Registrar Ambientes",
      },
      {
        path: "asignar-reglas",
        name: "Asignar reglas ",
      },
    ],
  },
  {
    path: "notificaciones",
    name: "Notificaciones",
    submenu: false,
    icon: <BsBuildingsFill />,
    subMenuOptions: [
      {
        path: "ambientes-registrado",
        name: "Ambientes Registrados",
      },
    ],
  },
];
