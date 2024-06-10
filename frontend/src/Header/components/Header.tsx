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
import { IoLogoPolymer } from "react-icons/io";

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
  //const idUser = useAuthStore((state) => state.user?.id);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const User = useAuthStore((state) => state.user);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  const getNotificaciones = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/notificacionSinVista/${User?.id}`
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
    <div className="flex bg-azul p-3 max-h-[15vh] ">
      <div className="flex text-blanco mt-5  ">
        {/* Logo */}
        <div className="sidemenu__logo ml-3 mt-5">
          <IoLogoPolymer className="text-7xl max-w-[80px] min-w-[50px]" />
          <div className="leading-[.5] ml-3">
            <h1 className={`font-bold text-3xl`}>Steel Code</h1>
            <p className={`text-sm font-light`}>Gestion de Ambientes</p>
          </div>
        </div>
      </div>
      <div className=" ml-auto mt-2">
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
