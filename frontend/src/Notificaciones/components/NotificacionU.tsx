import { useEffect, useState } from "react";
import { Notificacion } from "../interfaces/Notificacion";
import axios from "axios";
import { useAuthStore } from "../../Login/stores/auth.store";
import { Accordion, AccordionItem, Pagination } from "@nextui-org/react";
import { IoInformationCircleOutline } from "react-icons/io5";

export const NotificacionU = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getNotificaciones();
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const user = useAuthStore((state) => state.user?.id);

  const getNotificaciones = async () => {
    const respuesta = await axios.get<Notificacion[]>(
      `http://127.0.0.1:8000/api/nombre_usuario_Notificacion/${user}`
    );
    setNotificaciones(respuesta.data);
  };

  const calculateItemsPerPage = () => {
    const headerHeight = 60; 
    const itemHeight = 120;
    const availableHeight = window.innerHeight - headerHeight;
    const items = Math.floor(availableHeight / itemHeight);
    setItemsPerPage(items);
  };

  const paginatedNotificaciones = notificaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container md:p-12 pt-4 sm:p-10 text-black">
      {notificaciones.length === 0 ? (
        <p>NO TIENE NOTIFICACIONES.</p>
      ) : (
        <Accordion variant="bordered" isCompact style={{ overflowX: "auto" }}>
          {paginatedNotificaciones.map((notificacion) => (
            <AccordionItem
              startContent={
                <IoInformationCircleOutline size={30} className="text-warning" />
              }
              className="sm:m-3 md:m-5"
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
                  <strong>Docente: </strong>
                  {notificacion.user.name} {notificacion.user.apellidos}
                </p>
                <p>
                  <strong>Fecha de la reserva: </strong>
                  {notificacion.solicitud.fecha_solicitud}
                </p>
                <p>
                  <strong>Aula: </strong>
                  {notificacion.solicitud.ambientes.map((ambiente,index)=>(
                    <div key={index}>
                      {`*${ambiente.nombre} => ${ambiente.ubicacion}`}
                    </div>
                  ))}
                </p>
                <p>
                  <strong>Materia: </strong>
                  {notificacion.solicitud.materia.nombre_materia}
                </p>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <div className="flex justify-center mb-4">
        <Pagination
          showControls
          total={Math.ceil(notificaciones.length / itemsPerPage)}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
