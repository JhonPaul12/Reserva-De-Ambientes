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
  Input,
  Textarea,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import axios from "axios";
import { CReservaA } from "../interfaces/Reserva";
import "./estilosCancelar.css";
export const CancelarReservaA = () => {
  const [solicitudes, setSolicitudes] = useState<CReservaA[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [tituloNotificacion, setTituloNotificacion] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get<CReservaA[]>(
      `http://127.0.0.1:8000/api/periodoSolicitud2`
    );
    const solicitudesPendientes = respuesta.data.filter(
      (solicitud) => solicitud.solicitud.estado === "Aceptada"
    );
    setSolicitudes(solicitudesPendientes);
  };

  const openModal = (id: number, usuarioId: number) => {
    setSolicitudId(id);
    setUsuarioId(usuarioId);
    setModalOpen(true);
  };

  const cancelarSolicitud = async () => {
    if (solicitudId && usuarioId) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/cambiarEstadoAdmin/${solicitudId}`,
          { reason: cancelReason }
        );

        await axios.post(`http://127.0.0.1:8000/api/notificacion`, {
          id_usuario: usuarioId,
          id_solicitud: solicitudId,
          titulo: tituloNotificacion,
          contenido: cancelReason,
          visto: 1,
        });

        getSolicitudes();
        setModalOpen(false);
        setCancelReason("");
        setTituloNotificacion("");
      } catch (error) {
        console.error("Error al cancelar la solicitud:", error);
      }
    }
  };

  return (
    <div className="contenedor-table text-center my-5">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        RECHAZAR RESERVA
      </label>
      <section className="mx-6 my-4">
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Docente
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Materia
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Inicio
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Fin
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Fecha
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Est.
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Estado
            </TableColumn>
            <TableColumn className="text-center text-2xl bg-slate-300">
              Opción
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.solicitud_id}>
                <TableCell className="text-xs text-black">
                  {solicitud.solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.solicitud.users.map((user, index) => (
                    <div key={index}>
                      *{user.name} {user.apellidos}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.solicitud.materia.nombre_materia}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.periodos[0].periodo.horario.hora_inicio}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {
                    solicitud.periodos[solicitud.periodos.length - 1].periodo
                      .horario.hora_fin
                  }
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.periodos[0].periodo.fecha}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.solicitud.estado}
                </TableCell>
                <TableCell className="text-xs text-black">
                  <Button
                    color="danger"
                    variant="shadow"
                    onClick={() =>
                      openModal(
                        solicitud.solicitud.id,
                        solicitud.solicitud.users[0].id
                      )
                    }
                  >
                    Rechazar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="3xl">
        <ModalContent className="modal-content-large">
          <ModalHeader>
            <h2 className="text-lg">
              Por favor, ingrese el motivo para rechazar la reserva:
            </h2>
          </ModalHeader>
          <ModalBody className="">
            <div>
              <Input
                labelPlacement="outside"
                fullWidth
                value={tituloNotificacion}
                onChange={(e) => setTituloNotificacion(e.target.value)}
                label="Motivo"
                className="my-2"
              />
            </div>
            <div className="textArea">
              <Textarea
                fullWidth
                labelPlacement="outside"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                label="Descripcion del motivo"
                className=""
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="shadow" onClick={cancelarSolicitud}>
              Sí, rechazar
            </Button>
            <Button variant="shadow" onClick={() => setModalOpen(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
