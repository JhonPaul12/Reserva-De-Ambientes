import {
  Button,
  Badge,
  Listbox,
  ListboxItem,
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
    <div className="flex bg-azul justify-end w-full p-3 relative">
      <Badge
        content={notificaciones.length}
        isInvisible={notificaciones.length === 0}
        shape="circle"
        size="md"
      >
        <Button
          variant="bordered"
          onClick={toggleNotifications}
          radius="full"
          isIconOnly
          className="bg-default"
          size="md"
        >
          <MdOutlineNotificationsActive size={27} color="white" />
        </Button>
      </Badge>
      {showNotifications && (
        <NotificationList
          notifications={notificaciones}
          refreshNotifications={getNotificaciones}
        />
      )}
    </div>
  );
};
