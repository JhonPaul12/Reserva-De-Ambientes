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
  Pagination,
} from "@nextui-org/react";
import axios from "axios";
import { CReservaD } from "../interfaces/Solicitud";
import { useAuthStore } from "../../Login/stores/auth.store";

export const CancelarS = () => {
  const [solicitudes, setSolicitudes] = useState<CReservaD[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);
  const [solicitudDetalles, setSolicitudDetalles] = useState<{
    materia: string;
    motivo: string;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getSolicitudes();
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const user = useAuthStore((state) => state.user?.id);

  const getSolicitudes = async () => {
    const respuesta = await axios.get<CReservaD[]>(
      `http://127.0.0.1:8000/api/nombre_usuario/${user}`
    );
    const solicitudesPendientes = respuesta.data.filter(
      (solicitud) => solicitud.solicitud.estado === "Aceptada"
    );
    setSolicitudes(solicitudesPendientes);
  };

  const calculateItemsPerPage = () => {
    const headerHeight = 35;
    const rowHeight = 90;
    const availableHeight = window.innerHeight - headerHeight;
    const items = Math.floor(availableHeight / rowHeight);
    setItemsPerPage(items);
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

  const paginatedSolicitudes = solicitudes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full px-4 sm:px-8">
      <div>
        <label className="block text-3xl font-bold text-gray-900">
          CANCELAR RESERVA
        </label>
        <Table
          className="w-full mt-5 mb-8 text-center"
          aria-label="Tabla de datos"
        >
          <TableHeader>
            <TableColumn className="text-xs text-center bg-slate-300">
              AMBIENTE
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              DOCENTE
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              MATERIA
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              MOTIVO
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              INICIO
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              FIN
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              FECHA
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              PERSONAS
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              ESTADO
            </TableColumn>
            <TableColumn className="text-xs text-center bg-slate-300">
              OPCIÓN
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Tiene reservas para cancelar"}>
            {paginatedSolicitudes.map((solicitud) => (
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
                  {solicitud.solicitud.motivo}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.periodos[0].periodo.horario.hora_inicio.slice(
                    0,
                    -3
                  )}
                </TableCell>
                <TableCell className="text-xs text-black">
                  {solicitud.periodos[
                    solicitud.periodos.length - 1
                  ].periodo.horario.hora_fin.slice(0, -3)}
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
        <div className="flex justify-center my-4">
          <Pagination
            showControls
            total={Math.ceil(solicitudes.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalContent>
            <ModalHeader>¿Está seguro de cancelar su reserva?</ModalHeader>
            <ModalBody>
              <p>Materia: {solicitudDetalles?.materia}</p>
              <p>Motivo: {solicitudDetalles?.motivo}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="shadow"
                onClick={cancelarSolicitud}
              >
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
