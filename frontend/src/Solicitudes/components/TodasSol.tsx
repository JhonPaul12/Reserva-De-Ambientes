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
  Pagination,
  Spinner,  // Importa el componente Spinner
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SolicitudD } from "../interfaces/Solicitud";
import { useAuthStore } from "../../Login/stores/auth.store";

export const TodasSol = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudD[]>([]);
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalText, setModalText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); 

  const user = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    getSolicitudes();
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const getSolicitudes = async () => {
    setLoading(true); 
    try {
      const respuesta = await axios.get(
        `http://127.0.0.1:8000/api/nombre_usuario/${user}`
      );
      setSolicitudes(respuesta.data);
      console.log(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
    } finally {
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

  const handleRechazadoClick = async (solicitudId: string) => {
    setModalSolicitudId(solicitudId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/solicitudID/${solicitudId}`
      );
      setModalText(response.data);
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

  const paginatedSolicitudes = solicitudes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full px-4 sm:px-8 mt-10">
      <div>
        <label className="block text-2xl sm:text-3xl font-bold text-gray-900 ">
          HISTORIAL DE RESERVAS
        </label>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              className="custom-table text-center"
              aria-label="Tabla de datos"
            >
              <TableHeader>
                <TableColumn className="text-xs text-center bg-slate-300">
                  AMBIENTES
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
              </TableHeader>
              <TableBody emptyContent={"No tiene reservas realizadas"}>
                {paginatedSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.solicitud.id}>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.ambientes.map((ambiente,index)=>(
                          <div key={index}>
                            *{ambiente.nombre}
                          </div>
                      ))}
                        
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
                      {solicitud.solicitud.motivo}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.periodos[0].periodo.horario.hora_inicio.slice(
                        0,
                        -3
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.periodos[
                        solicitud.periodos.length - 1
                      ].periodo.horario.hora_fin.slice(0, -3)}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.fecha_solicitud}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.numero_estudiantes}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-black">
                      {solicitud.solicitud.estado === "Rechazado" ? (
                        <div className="flex flex-col items-center">
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
                        </div>
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
