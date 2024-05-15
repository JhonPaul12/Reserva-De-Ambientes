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
import { Solicitud } from "../interfaces/Solicitud";
import "./estilos.css";

export const CancelarS = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<number | null>(null);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get<Solicitud[]>(
      `http://127.0.0.1:8000/api/showAllDocentes/Vladimir Abel`
    );
    const solicitudesPendientes = respuesta.data.filter(
      (solicitud) => solicitud.estado === "Aceptado"
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
            {/* <TableColumn className="text-center text-3xl bg-slate-300">H. Inicio</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">H. Final</TableColumn> */}
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
              Opcion
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell className="text-base text-black">
                  {solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.docente.nombre + " " + solicitud.docente.apellido}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.materia.nombre_materia}
                </TableCell>
                {/* <TableCell className="text-base text-black">
                  {solicitud.hora_inicio}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.hora_fin}
                </TableCell> */}
                <TableCell className="text-base text-black">
                  {solicitud.fecha_solicitud}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-base text-black">
                  {solicitud.estado}
                </TableCell>
                <TableCell className="text-base text-black">
                  <Button
                    className="bg-danger"
                    onClick={() => openModal(solicitud.id)}
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
        className="p-10 bg-white"
      >
        <ModalContent className="">
          ¿Estás seguro de que quieres cancelar esta solicitud?
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
