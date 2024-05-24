import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  ChipProps,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SolicitudD } from "../interfaces/Solicitud";

export const TodasSol = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudD[]>([]);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null); // Estado para almacenar el ID de la solicitud para el modal
  const [modalText, setModalText] = useState<string>(""); // Estado para almacenar el texto de la solicitud

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/nombre_usuario/Vladimir Abel`
    );
    setSolicitudes(respuesta.data);
    console.log(respuesta.data);
  };

  const handleRechazadoClick = async (solicitudId: string) => {
    setModalSolicitudId(solicitudId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/solicitudID/${solicitudId}`
      );
      setModalText(response.data); // Establecer el texto de la solicitud en el estado
    } catch (error) {
      console.error("Error al obtener el texto de la solicitud:", error);
      setModalText("Error al obtener el texto de la solicitud");
    }
  };
  const statusColorMap: Record<string, ChipProps["color"]>  = {
    Aceptado: "success",
    Cancelado: "danger",
    Rechazado: "danger",
    Pendiente: "danger",
  };

  return (
    <div className="mt-10 sm:mx-auto w-full max-w-screen-md">
      <div>
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        HISTORIAL DE RESERVAS
      </label>
      <Table removeWrapper className="w-80% mt-5" aria-label="Tabla de datos">
        <TableHeader>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Ambiente
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Docente
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Materia
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            H. Inicio
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            H. Final
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Fecha
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Nro. Est.
          </TableColumn>
          <TableColumn className="text-center border-0 text-sm bg-slate-300">
            Estado
          </TableColumn>
        </TableHeader>
        <TableBody>
          {solicitudes.map((solicitud) => (
            <TableRow>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.solicitud.ambiente.nombre}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.solicitud.materia.user.name}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.solicitud.materia.nombre_materia}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.periodos[0].periodo.horario.hora_inicio}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {
                  solicitud.periodos[solicitud.periodos.length - 1].periodo
                    .horario.hora_fin
                }
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.periodos[0].periodo.fecha}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.solicitud.numero_estudiantes}
              </TableCell>
              <TableCell className="text-xs border-0 text-black">
                {solicitud.solicitud.estado === "Rechazado" ? (
                  
                  <button
                  >
                    
                   <Chip className="capitalize" color={statusColorMap[solicitud.solicitud.estado]} size="sm" variant="flat" onClick={() =>
                      handleRechazadoClick(solicitud.solicitud.id.toString())
                    }>
                      {solicitud.solicitud.estado}
                    </Chip>
                    <Link className="text-xs" underline="always" color="danger"  onClick={() =>
                      handleRechazadoClick(solicitud.solicitud.id.toString())
                    }>
                      detalles
                    </Link> 
                  </button>
                ) : (
                  <Chip className="capitalize" color={statusColorMap[solicitud.solicitud.estado]} size="sm" variant="flat"
                  >
                    {solicitud.solicitud.estado}
                  </Chip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={!!modalSolicitudId}
        onClose={() => setModalSolicitudId(null)}
      >
        <ModalContent>
          <ModalHeader>Motivo del Rechazo</ModalHeader>
          <ModalBody>
            <p>{modalText}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-primary text-white"
              onClick={() => setModalSolicitudId(null)}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
      
    </div>
  );
};
