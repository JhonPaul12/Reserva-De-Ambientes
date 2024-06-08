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
import { useAuthStore } from "../../Login/stores/auth.store";

export const TodasSol = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudD[]>([]);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalText, setModalText] = useState<string>("");

  const user = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/nombre_usuario/${user}`
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
  const statusColorMap: Record<string, ChipProps["color"]> = {
    Aceptada: "success",
    Cancelado: "warning",
    Rechazado: "danger",
    Pendiente: "danger",
  };

  return (
    <div className=" mt-10 sm:mx-auto w-full pr-12 pl-12">
      <div className="">
        <label className="text-3xl font-bold text-center text-gray-900">
          HISTORIAL DE RESERVAS
        </label>
        <Table className="custom-table text-center" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className=" text-sm bg-slate-300">
              AMBIENTE
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              DOCENTE
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              MATERIA
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              MOTIVO
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              INICIO
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              FIN
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              &nbsp; &nbsp; FECHA &nbsp; &nbsp;
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              PERSONAS
            </TableColumn>
            <TableColumn className="text-center border-0 text-sm bg-slate-300">
              ESTADO
            </TableColumn>
          </TableHeader>
          <TableBody>
            {solicitudes.map((solicitud) => (
              <TableRow>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.ambiente.nombre}
                </TableCell>
                <TableCell className="text-xs text-black border-none">
                  {solicitud.solicitud.users.map((user, index) => (
                    <div key={index}>
                      *{user.name} {user.apellidos}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.materia.nombre_materia}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.motivo}
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
                  {solicitud.periodos[0].periodo.fecha}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.numero_estudiantes}
                </TableCell>
                <TableCell className="text-xs border-0 text-black">
                  {solicitud.solicitud.estado === "Rechazado" ? (
                    <button
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        className="capitalize"
                        color={statusColorMap[solicitud.solicitud.estado]}
                        size="sm"
                        variant="flat"
                        onClick={() =>
                          handleRechazadoClick(
                            solicitud.solicitud.id.toString()
                          )
                        }
                      >
                        Cancelado
                      </Chip>
                      <Link
                        className="text-xs"
                        underline="always"
                        color="danger"
                        onClick={() =>
                          handleRechazadoClick(
                            solicitud.solicitud.id.toString()
                          )
                        }
                      >
                        detalles
                      </Link>
                    </button>
                  ) : (
                    <Chip
                      className="capitalize"
                      color={statusColorMap[solicitud.solicitud.estado]}
                      size="sm"
                      variant="flat"
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
                color="primary"
                variant="shadow"
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
