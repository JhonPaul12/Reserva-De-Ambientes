import { useEffect, useState } from "react";
import { Notificacion } from "../interfaces/Notificacion";
import axios from "axios";
import "./estilosNotificaciones.css";
import { useAuthStore } from "../../Login/stores/auth.store";

export const NotificacionU = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  useEffect(() => {
    getNotificaciones();
  }, []);

  const user = useAuthStore((state) => state.user?.id)

  const getNotificaciones = async () => {
    const respuesta = await axios.get<Notificacion[]>(
      `http://127.0.0.1:8000/api/nombre_usuario_Notificacion/${user}`
    );
    setNotificaciones(respuesta.data);
  };
  return (
    <div className="contenedor text-black">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        NOTIFICACIONES
      </label>
      {notificaciones.length === 0 ? (
        <p>NO TIENE NOTIFICACIONES.</p>
      ) : (
        <div className="notification-grid">
          {notificaciones.map((notificacion) => (
            <div className="card" key={notificacion.id}>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1 p-2 text-aling-center">
                  <p className="mt-2 font-bold text-l">
                    Detalles de la notificación:
                  </p>
                  <p className="text-bold">{notificacion.titulo}</p>
                  <p >{notificacion.contenido}</p>
                </div>
                <div className="flex-1 p-2">
                  <p className="mt-2 font-bold text-l">Detalles de la reserva rechazada:</p>
                  <p>
                    <strong>Docente:</strong> {notificacion.user.name}{" "}
                    {notificacion.user.apellidos}
                  </p>
                  <p>
                    <strong>Fecha de la reserva:</strong>{" "}
                    {notificacion.solicitud.fecha_solicitud}
                  </p>
                  <p>
                    <strong>Aula:</strong>{" "}
                    {notificacion.solicitud.ambiente.nombre}
                  </p>
                  <p>
                    <strong>Ubicación:</strong>{" "}
                    {notificacion.solicitud.ambiente.ubicacion}
                  </p>
                  <p>
                    <strong>Materia:</strong>{" "}
                    {notificacion.solicitud.materia.nombre_materia}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
