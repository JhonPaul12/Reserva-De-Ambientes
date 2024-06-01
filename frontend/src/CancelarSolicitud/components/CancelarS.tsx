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
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import axios from "axios";
import { CReservaD } from "../interfaces/Solicitud";
import "./estilos.css";
import { useAuthStore } from "../../Login/stores/auth.store";

export const CancelarS = () => {
  const [solicitudes, setSolicitudes] = useState<CReservaD[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);
  const [solicitudDetalles, setSolicitudDetalles] = useState<{ materia: string; motivo: string } | null>(null);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const user = useAuthStore((state) => state.user?.id)

  const getSolicitudes = async () => {
    const respuesta = await axios.get<CReservaD[]>(
      `http://127.0.0.1:8000/api/nombre_usuario/${user}`
    );
    const solicitudesPendientes = respuesta.data.filter(
      (solicitud) => solicitud.solicitud.estado === "Aceptada"
    );
    setSolicitudes(solicitudesPendientes);
  };

  const openModal = (solicitud: CReservaD) => {
    setSolicitudId(solicitud.solicitud.id);
    setSolicitudDetalles({
      materia: solicitud.solicitud.materia.nombre_materia,
      motivo: solicitud.solicitud.motivo,
    });
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
              MOTIVO
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
                <TableCell className="text-xs text-black border-0">
                  {solicitud.solicitud.users.map((user, index) => (
                    <div key={index}>
                      *{user.name} {user.apellidos}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <small> {solicitud.solicitud.materia.nombre_materia}</small>
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  <small> {solicitud.solicitud.motivo}</small>
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.periodos[0].periodo.horario.hora_inicio.slice(
                    0,
                    -3
                  )}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.periodos[
                    solicitud.periodos.length - 1
                  ].periodo.horario.hora_fin.slice(0, -3)}
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
                    color="danger"
                    size="sm"
                    onClick={() => openModal(solicitud)}
                    variant="shadow"
                  >
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalContent className="">
            <ModalHeader>¿Está seguro de cancelar su reserva?</ModalHeader>
            <ModalBody>
              <p>Materia: {solicitudDetalles?.materia}</p>
              <p>Motivo: {solicitudDetalles?.motivo}</p>
            </ModalBody>
            <ModalFooter className="">
              <Button color="danger" variant="shadow" onClick={cancelarSolicitud}>
                Sí, cancelar
              </Button>
              <Button onClick={() => setModalOpen(false)}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
