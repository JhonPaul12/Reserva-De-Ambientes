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
      (solicitud) => solicitud.solicitud.estado === "Aceptado"
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
    <div className="contenedor-table">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        CANCELAR RESERVA
      </label>
      <section className="mx-6 my-4">
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ambiente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Docente
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Materia
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              H. Inicio
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              H. Final
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Fecha
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Nro. Est.
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Estado
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Opción
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.solicitud_id}>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.materia.user.name +
                    " " +
                    solicitud.solicitud.materia.user.apellidos}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.materia.nombre_materia}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.periodos[0].periodo.horario.hora_inicio}
                </TableCell>
                <TableCell className="text-base text-black">
                  {
                    solicitud.periodos[solicitud.periodos.length - 1].periodo
                      .horario.hora_fin
                  }
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.periodos[0].periodo.fecha}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.solicitud.estado}
                </TableCell>
                <TableCell className="text-base text-black">
                  <Button
                    className="bg-danger text-white"
                    onClick={() =>
                      openModal(
                        solicitud.solicitud.id,
                        solicitud.solicitud.materia.user.id
                      )
                    }
                  >
                    Cancelar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="modal-large"
      >
        <ModalContent className="modal-content-large">
          <ModalHeader>
            <h2 className="text-lg">
              Por favor, ingrese los motivos de la cancelación:
            </h2>
          </ModalHeader>
          <ModalBody className="">
            <div>
            <Input
              fullWidth
              value={tituloNotificacion}
              onChange={(e) => setTituloNotificacion(e.target.value)}
              placeholder="Título"
              className="my-2"
            />
            </div>
            <div className="textArea">
            <Textarea
              fullWidth
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Motivo de cancelación"
              className=""
            />
            </div>
          </ModalBody>
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
  );
};
