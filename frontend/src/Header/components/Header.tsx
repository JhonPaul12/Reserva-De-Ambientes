import React, { useEffect, useRef, useState } from "react";
import { IoLogoPolymer } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
    await axios.put(
      `http://127.0.0.1:8000/api/cambiarEstadoNotificacion/${notificacionID}`
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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

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
      const response = await axios.get(
        `http://127.0.0.1:8000/api/notificacionSinVista/${user?.id}`
      );
      setNotificaciones(response.data);
      if (response.data.length > 0) {
        toast.success("Tiene nuevas notificaciones");
      }
    } catch (error) {
      console.error("Error al obtener notificaciones", error);
    }
  };

  return (
    <div
      className="flex flex-row  p-3 min-h-[15vh]"
      style={{ backgroundColor: "#0d1b47" }}
    >
      {/* Logo */}
      <div className="flex items-center text-white pl-10 sm:pl-12">
        <div>
          <IoLogoPolymer className="text-7xl md:text-7xl" />
        </div>
        <div className="ml-3">
          <h1 className="font-bold text-xl md:text-4xl">Steel Code</h1>
          <p className="text-xs md:text-sm">Gestión de Ambientes</p>
        </div>
      </div>

      {/* iconos */}
      <div className="ml-auto flex items-center space-x-4 relative">
        <div>
          <Badge
            content={notificaciones.length}
            isInvisible={notificaciones.length === 0}
            shape="circle"
            color="success"
            size="sm"
          >
            <Button
              className="butn my-auto"
              onClick={toggleNotifications}
              radius="full"
              isIconOnly
              color="primary"
            >
              <MdNotificationsActive className="text-2xl md:text-3xl" />
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
              <Avatar className="butn" as="button" color="primary" size="md" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user?.name}</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            {/*<DropdownItem key="settings">Editar perfil</DropdownItem>
            <DropdownItem key="configurations">Configuraciones</DropdownItem>*/}
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
