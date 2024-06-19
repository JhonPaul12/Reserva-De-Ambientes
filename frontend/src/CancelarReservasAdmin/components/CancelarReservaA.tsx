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
  Pagination,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { CReservaA } from "../interfaces/Reserva";
import { toast } from "sonner";

export const CancelarReservaA = () => {
  const [solicitudes, setSolicitudes] = useState<CReservaA[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [tituloNotificacion, setTituloNotificacion] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [usuarioEmail, setUsuarioEmail] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [cancelando, setCancelando] = useState(false); 

  useEffect(() => {
    getSolicitudes();
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const getSolicitudes = async () => {
    setLoading(true);
    try {
      const respuesta = await axios.get<CReservaA[]>(
        `http://127.0.0.1:8000/api/periodoSolicitud2`
      );
      const solicitudesPendientes = respuesta.data.filter(
        (solicitud) => solicitud.solicitud.estado === "Aceptada"
      );
      setSolicitudes(solicitudesPendientes);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
      setLoading(false);
    }
  };

  const calculateItemsPerPage = () => {
    const headerHeight = 35;
    const rowHeight = 90;
    const availableHeight = window.innerHeight - headerHeight;
    const items = Math.floor(availableHeight / rowHeight);
    setItemsPerPage(items);
  };

  const openModal = (id: number, usuarioId: number, usuarioEmail: string) => {
    setSolicitudId(id);
    setUsuarioId(usuarioId);
    setUsuarioEmail(usuarioEmail);
    setModalOpen(true);
  };

  const cancelarSolicitud = async () => {
    if (solicitudId && usuarioId && usuarioEmail) {
      try {
        setCancelando(true); 

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

        await axios.post(`http://127.0.0.1:8000/api/enviarEmail`, {
          email: usuarioEmail,
          title: tituloNotificacion,
          description: cancelReason,
        });

        getSolicitudes();
        setModalOpen(false);
        setCancelReason("");
        setTituloNotificacion("");
        toast.success("Reserva Cancelada");
      } catch (error) {
        toast.warning("Error al cancelar la solicitud");
        console.error("Error al cancelar la solicitud:", error);
      } finally {
        setCancelando(false);
      }
    }
  };

  const paginatedSolicitudes = solicitudes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full px-4 sm:px-8 mt-10">
      <div>
        <label className="block text-2xl sm:text-3xl font-bold text-gray-900 ">
          CANCELAR RESERVA
        </label>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center mt-8">
              <Spinner />
            </div>
          ) : (
            <Table
              className="custom-table text-center"
              aria-label="Tabla de datos"
            >
              <TableHeader>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Ambiente
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Docente
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Materia
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Inicio
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Fin
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Fecha
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Personas
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Estado
                </TableColumn>
                <TableColumn className="text-xs text-center sm:text-sm bg-slate-300">
                  Opción
                </TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No Tiene reservas para cancelar"}>
                {paginatedSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.solicitud_id}>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.ambiente.nombre}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.users.map((user, index) => (
                        <div key={index}>
                          *{user.name} {user.apellidos}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.materia.nombre_materia}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.periodos[0].periodo.horario.hora_inicio}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {
                        solicitud.periodos[solicitud.periodos.length - 1]
                          .periodo.horario.hora_fin
                      }
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.fecha_solicitud}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.numero_estudiantes}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.estado}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      <Button
                        color="danger"
                        variant="shadow"
                        size="sm"
                        onClick={() =>
                          openModal(
                            solicitud.solicitud.id,
                            solicitud.solicitud.users[0].id,
                            solicitud.solicitud.users[0].email
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
          )}
        </div>
        <div className="flex justify-center my-4">
          <Pagination
            showControls
            total={Math.ceil(solicitudes.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          size="3xl"
        >
          <ModalContent className="modal-content-large">
            <ModalHeader>
              Por favor, ingrese el motivo para cancelar la reserva:
            </ModalHeader>
            <ModalBody>
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
                  label="Descripción del motivo"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="shadow"
                onClick={cancelarSolicitud}
                isLoading={cancelando}
              >
                {cancelando ? "Cancelando..." : "Si, Cancelar"}
              </Button>
              <Button variant="shadow" onClick={() => setModalOpen(false)}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
