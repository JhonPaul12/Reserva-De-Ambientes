import { LuHome, LuLayers, LuUserCircle2 } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { FaCalendarDays } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { FaChalkboardTeacher } from "react-icons/fa";

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
    icon: <IoNotificationsCircleOutline size={30} />,
    subMenuOptions: [
      {
        path: "cancelacion-ambiente",
        name: "Cancelación Ambientes",
        icon: <SiGoogleclassroom />,
      },
      {
        path: "cancelacion-ubicacion",
        name: "Cancelación Ubicación",
        icon: <FaMapLocationDot />,
      },
    ],
  },
  {
    path: "Gestion Academica",
    name: "Gestion",
    icon: <LuLayers />,
    submenu: true,
    subMenuOptions: [
      {
        path: "gestion-ambientes",
        name: "Crear Gestion",
        icon: <LuLayers />,
      },
      {
        path: "crear-feriados",
        name: "Crear Feriados",
        icon: <LuLayers />,
      },
    ],
  },
  {
    path: "Generar Informes",
    name: "Generar Informes",
    submenu: true,
    icon: <TbReportAnalytics size={30} />,
    subMenuOptions: [
      {
        path: "informe-ambiente",
        name: "Informe Ambientes",
        icon: <SiGoogleclassroom />,
      },
      {
        path: "informe-docentes",
        name: "Informe Docentes",
        icon: <FaChalkboardTeacher />,
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
    path: "calendario",
    name: "Ver Calendario",
    icon: <FaCalendarDays />,
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
