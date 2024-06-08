import {
  Button,
  Badge,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarContent,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useAuthStore } from "../../Login/stores/auth.store";
import "./Header.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export const Header = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const idUser = useAuthStore((state) => state.user?.id);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  const getNotificaciones = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/notificacionSinVista/${idUser}`
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
    <div className="flex bg-azul justify-end w-full p-3 relative">
      <div>
        <Badge
          content={notificaciones.length}
          isInvisible={notificaciones.length === 0}
          shape="circle"
          color="primary"
          size="sm"
        >
          <Button
            className="my-auto"
            onClick={toggleNotifications}
            radius="full"
            isIconOnly
            variant="light"
          >
            <MdOutlineNotificationsActive size={27} color="white" />
          </Button>
          <Navbar className="bg-azul">
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      //name="User"
                      size="sm"
                      //src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">Editar perfil</DropdownItem>
                  <DropdownItem key="configurations">
                    Configuraciones
                  </DropdownItem>

                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
        </Badge>
        {showNotifications && (
          <NotificationList
            notifications={notificaciones}
            refreshNotifications={getNotificaciones}
          />
        )}
      </div>
    </div>
  );
};
