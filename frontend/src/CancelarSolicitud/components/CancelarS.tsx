import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import axios from "axios";
import { CReservaD} from "../interfaces/Solicitud";
import "./estilos.css";

export const CancelarS = () => {
  const [solicitudes, setSolicitudes] = useState<CReservaD[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get<CReservaD[]>(
      `http://127.0.0.1:8000/api/nombre_usuario/Vladimir Abel`
    );
    const solicitudesPendientes = respuesta.data.filter(
      (solicitud) => solicitud.solicitud.estado === "Aceptado"
    );
    setSolicitudes(solicitudesPendientes);
  };

  const openModal = (id: number) => {
    setSolicitudId(id);
    setModalOpen(true);
  };

  const cancelarSolicitud = async () => {
    if (solicitudId) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/cambiarEstadoUser/${solicitudId}`
        );
        getSolicitudes();
        setModalOpen(false);
      } catch (error) {
        console.error("Error al cancelar la solicitud:", error);
      }
    }
  };

  return (
    <div className="mx-6 my-4 sm:mx-auto w-full max-w-screen-md">
      <div>
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        CANCELAR RESERVA
      </label>
        <Table className="w-80% mt-5 mb-8" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              AMBIENTE
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              DOCENTE
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              MATERIA
            </TableColumn>
             <TableColumn className="text-center border-0 text-xs bg-slate-300">
              INICIO
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              FIN
            </TableColumn> 
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
            &nbsp; FECHA &nbsp;
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              PERSONAS
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              ESTADO
            </TableColumn>
            <TableColumn className="text-center border-0 text-xs bg-slate-300">
              OPCION
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.solicitud_id}>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <small>{solicitud.solicitud.materia.user.name + " " + solicitud.solicitud.materia.user.apellidos}</small>
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <small> {solicitud.solicitud.materia.nombre_materia}</small>
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                    {solicitud.periodos[0].periodo.horario.hora_inicio.slice(0, -3)}
                  </TableCell>
                  <TableCell className="text-xs border-0 text-black">
                    {solicitud.periodos[solicitud.periodos.length-1].periodo.horario.hora_fin.slice(0, -3)}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <small>{solicitud.periodos[0].periodo.fecha}</small>
                </TableCell>
                <TableCell className="text-xs  border-0 text-black">
                  {solicitud.solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.estado}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <Button
                    className="bg-danger text-white"
                    size="sm"
                    onClick={() => openModal(solicitud.solicitud.id)}
                  >
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="p-10 bg-white"
      >
        <ModalContent className="">
          ¿Estás seguro de que quieres cancelar su reserva?
          <Button
            className="bg-danger m-2 text-white"
            onClick={cancelarSolicitud}
          >
            Sí, cancelar
          </Button>
          <Button className="m-2" onClick={() => setModalOpen(false)}>
            No
          </Button>
        </ModalContent>
      </Modal>
      </div>
    </div>
  );
};
