import { useEffect, useState } from "react";
import { Notificacion } from "../interfaces/Notificacion";
import axios from "axios";
import "./estilosNotificaciones.css";
import { useAuthStore } from "../../Login/stores/auth.store";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { IoInformationCircleOutline } from "react-icons/io5";

export const NotificacionU = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  useEffect(() => {
    getNotificaciones();
  }, []);

  const user = useAuthStore((state) => state.user?.id);

  const getNotificaciones = async () => {
    const respuesta = await axios.get<Notificacion[]>(
      `http://127.0.0.1:8000/api/nombre_usuario_Notificacion/${user}`
    );
    setNotificaciones(respuesta.data);
  };
  return (
    <div className="container p-12 text-black">
      {notificaciones.length === 0 ? (
        <p>NO TIENE NOTIFICACIONES.</p>
      ) : (
        <Accordion variant="bordered" isCompact style={{overflowX:'auto'}}>
          {notificaciones.map((notificacion) => (
            <AccordionItem
              startContent={
                <IoInformationCircleOutline size={30} className="text-warning" />
              }
              className="m-5"
              key={notificacion.id}
              title={
                <div className="">
                  <div className="flex justify-content-between">
                    <p className="pr-5">
                      <strong>Fecha de la Notificacion: </strong>
                      {notificacion.created_at.slice(0, 10)}
                    </p>
                    <p>
                      <strong>Motivo: </strong>
                      {notificacion.titulo}
                    </p>
                  </div>
                  <p>
                    <strong>Descripcion:</strong> {notificacion.contenido}
                  </p>
                </div>
              }
            >
              <div className="pl-12">
                <p className="mt-2 font-bold text-l">Detalles de la reserva:</p>
                <p>
                  <strong>Docente:</strong>
                  {notificacion.user.name} {notificacion.user.apellidos}
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
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
