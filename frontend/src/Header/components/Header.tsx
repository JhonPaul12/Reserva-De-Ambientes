import React, { useEffect, useRef, useState } from "react";
import { IoLogoPolymer } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
import {
  Button,
  Badge,
  Listbox,
  ListboxItem,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  // Input,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../../Login/stores/auth.store";
import "./Header.css";

interface Notificacion {
  id: number;
  titulo: string;
  contenido: string;
  estado: string;
}

const NotificationList: React.FC<{
  notifications: Notificacion[];
  refreshNotifications: () => void;
}> = ({ notifications, refreshNotifications }) => {
  const navigate = useNavigate();

  const handleAction = async (notificacionID: number) => {
    // await axios.put(
    //   `http://127.0.0.1:8000/api/cambiarEstadoNotificacion/${notificacionID}`
    // );
    await axios.put(
      import.meta.env.VITE_API_URL +
        "/api/cambiarEstadoNotificacion/" +
        notificacionID
    );
    refreshNotifications();
    navigate("/user/notificaciones");
  };

  return (
    <div className="notification-list p-3">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <Listbox
              aria-label="Actions"
              onAction={() => handleAction(notification.id)}
            >
              <ListboxItem key={index}>
                Solicitud: {notification.estado}
                <br />
                {notification.titulo}
              </ListboxItem>
            </Listbox>
          </div>
        ))
      ) : (
        <p>No tienes nuevas notificaciones</p>
      )}
    </div>
  );
};

export const HeaderU = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const notificationsRef = useRef<HTMLDivElement>(null);
  //const navigate = useNavigate();
  // const [searchValue, setSearchValue] = useState("");
  // const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  // const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const navigate = useNavigate();
  const admin = user?.roles.includes("Admin");
  const authUser = user?.roles.includes("User");

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getNotificaciones();
  }, []);

  const getNotificaciones = async () => {
    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/notificacionSinVista/${user?.id}`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/notificacionSinVista/" + user?.id
      );
      setNotificaciones(response.data);
      if (response.data.length > 0) {
        toast.success("Tiene nuevas notificaciones");
      }
    } catch (error) {
      console.error("Error al obtener notificaciones", error);
    }
  };

  // const handleSearchChange = async (value: string) => {
  //   setSearchValue(value);

  //   let suggestions: string[] = [];

  //   if (user?.roles && user.roles.some((role) => role === "Admin")) {
  //     suggestions = [
  //       "inicio",
  //       "asignar-reglas",
  //       "registrar-ambiente",
  //       "ambientes-registrados",
  //       "editar-ambientes",
  //       "lista-docentes",
  //       "reservas",
  //       "cancelar-reservas",
  //       "gestion-ambientes",
  //       "crear-feriados",
  //       "modificar-docentes",
  //       "crear-docente",
  //       "dar-baja-docente",
  //       "cancelacion-ambiente",
  //       "cancelacion-ubicacion",
  //       "informe-ambiente",
  //       "informe-docente",
  //     ];
  //   } else {
  //     suggestions = [
  //       "inicio",
  //       "solicitar-reserva",
  //       "visualizar-ambientes",
  //       "calendario",
  //       "cancelar-reserva",
  //       "reservas",
  //       "notificaciones",
  //     ];
  //   }

  //   suggestions = suggestions.filter((route) =>
  //     route.toLowerCase().includes(value.toLowerCase())
  //   );

  //   setShowSuggestions(value.length >= 3);

  //   setSearchSuggestions(suggestions);
  // };

  // const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     if (user?.roles && user.roles.some((role) => role === "Admin")) {
  //       navigate(`/admin/${searchValue}`);
  //     } else {
  //       navigate(`/user/${searchValue}`);
  //     }
  //   }
  // };

  return (
    <div
      className="flex flex-row p-3 min-h-[15vh]"
      style={{ backgroundColor: "#0d1b47" }}
    >
      <div className="flex items-center  text-white pl-10 sm:pl-2">
        <div>
          <IoLogoPolymer className="text-5xl md:text-7xl" />
        </div>
        <div className="ml-3 ">
          <h1 className="font-bold text-md sm:text-3xl">Steel Code</h1>
          <p className="text-xs md:text-sm">Gestión de Ambientes</p>
        </div>
      </div>

      {/* <div className="flex-grow px-1 sm:px-12 pt-3 ">
        <Input
          classNames={{
            inputWrapper:
              "font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Buscar..."
          size="lg"
          startContent={<CiSearch size={25} />}
          type="search"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={handleSearch}
        />
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="absolute  bg-white border border-gray-200 rounded shadow-lg">
            {searchSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchValue(suggestion);
                  setShowSuggestions(false);
                  if (
                    user?.roles &&
                    user.roles.some((role) => role.toLowerCase() === "admin")
                  ) {
                    navigate(`/admin/${suggestion}`);
                  } else {
                    navigate(`/user/${suggestion}`);
                  }
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div> */}

      <div className="ml-auto sm:flex items-center sm:space-x-4 relative space-y-1 sm:space-y-0">
        <div>
          <Badge
            content={notificaciones.length}
            isInvisible={notificaciones.length === 0}
            color="success"
            size="sm"
            className="border-none"
          >
            <Button
              className="butn my-auto"
              onClick={toggleNotifications}
              radius="full"
              isIconOnly
              size="sm"
              color="primary"
            >
              <MdNotificationsActive className="text-lg md:text-xl" />
            </Button>
          </Badge>
          {showNotifications && (
            <div className="absolute right-0 mt-2" ref={notificationsRef}>
              <NotificationList
                notifications={notificaciones}
                refreshNotifications={getNotificaciones}
              />
            </div>
          )}
        </div>

        <Dropdown>
          <DropdownTrigger>
            <div className="transition-transform text-sm md:text-md">
              <Avatar className="butn" as="button" color="primary" size="sm" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user?.name}</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            {admin ? (
              <DropdownItem
                key="admin"
                onClick={() => navigate("/admin/inicio")}
              >
                Panel de administración
              </DropdownItem>
            ) : (
              <DropdownItem className="hidden"> </DropdownItem>
            )}
            {authUser ? (
              <DropdownItem
                key="admin"
                onClick={() => navigate("/user/inicio")}
              >
                Panel de Docente
              </DropdownItem>
            ) : (
              <DropdownItem className="hidden"> </DropdownItem>
            )}

            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
