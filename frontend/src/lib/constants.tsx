import { LuHome, LuLayers, LuUserCircle2 } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";

export const sideMenuOptions = [
  {
    path: "inicio",
    name: "Inicio",
    icon: <LuHome />,
  },
  {
    path: "Reservas",
    name: "Reservas",
    submenu: true,
    icon: <LuLayers />,
    subMenuOptions: [
      //{
      //  path: "filtrar-por-estado",
      //  name: "Filtrar por estado",
      //},
      {
        path: "reservas",
        name: "Ver Reservas",
        icon: <LuLayers />,
      },
      {
        path: "cancelar-reservas",
        name: "Cancelar Reservas",
        icon: <LuLayers />,
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
        name: "Ver Docentes",
        icon: <LuLayers />,
      },
      {
        path: "modificar-docentes",
        name: "Modificar Docentes",
        icon: <LuLayers />,
      },
      {
        path: "crear-docente",
        name: "Crear Docente ",
        icon: <LuLayers />,
      },
      {
        path: "dar-baja-docente",
        name: "Dar De Baja ",
        icon: <LuLayers />,
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
        icon: <LuLayers />,
      },
      {
        path: "asignar-reglas",
        name: "Asignar Horarios ",
        icon: <LuLayers />,
      },
      {
        path: "ambientes-registrados",
        name: "Ver Ambientes",
        icon: <LuLayers />,
      },
      {
        path: "editar-ambientes",
        name: "Editar Ambientes ",
        icon: <LuLayers />,
      },
    ],
  },
  {
    path: "Notificar",
    name: "Notificar",
    submenu: true,
    icon: <IoNotificationsCircleOutline size={30}/>,
    subMenuOptions: [
      {
        path: "notificar-ambiente",
        name: "Notificar Ambientes",
        icon: <SiGoogleclassroom />,
      },
      {
        path: "notificar-ubicacion",
        name: "Notificar Ubicacion",
        icon: <FaMapLocationDot />,
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
    path: "reservas",
    name: "Reservas",
    submenu: true,
    icon: <LuUserCircle2 />,
    subMenuOptions: [
      {
        path: "solicitar-reserva",
        name: "Solicitar Reserva",
        icon: <LuLayers />,
      },
      {
        path: "reservas",
        name: "Reservas",
        icon: <LuLayers />,
      },
      // {
      //   path: "lista-solicitudes",
      //   name: "Ver Solicitudes",
      // },
      //{
      //  path: "modificar-solicitud",
      // name: "Modificar Solicitud",
      //},
      {
        path: "cancelar-reserva",
        name: "Cancelar Reserva",
        icon: <LuLayers />,
      },
    ],
  },
  // {
  //   path: "historial",
  //   name: "Historial",
  //   submenu: false,
  //   icon: <BsBuildingsFill />,
  //   subMenuOptions: [
  //     {
  //       path: "ambientes-registrado",
  //       name: "Ambientes Registrados",
  //       icon: <LuLayers />,
  //     },
  //     {
  //       path: "registrar-ambientes",
  //       name: "Registrar Ambientes",
  //       icon: <LuLayers />,
  //     },
  //     {
  //       path: "asignar-reglas",
  //       name: "Asignar reglas ",
  //       icon: <LuLayers />,
  //     },
  //   ],
  // },
  {
    path: "notificaciones",
    name: "Notificaciones",
    submenu: false,
    icon: <BsBuildingsFill />,
    subMenuOptions: [
      {
        path: "ambientes-registrado",
        name: "Ambientes Registrados",
        icon: <LuLayers />,
      },
    ],
  },
];
