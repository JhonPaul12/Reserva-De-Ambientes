import {
  Chip,
  ChipProps,
  Select,
  SelectItem,
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
  Link,
  Pagination,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IReservaA } from "../interface/IReservaA";

export const VerReservaAdmin = () => {
  const [solicitudes, setSolicitudes] = useState<IReservaA[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalText, setModalText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    getSolicitudes();
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      // `http://127.0.0.1:8000/api/periodoSolicitud2`
      import.meta.env.VITE_API_URL + "/api/periodoSolicitud2"
    );
    setSolicitudes(respuesta.data);
    console.log(respuesta.data);
  };

  const calculateItemsPerPage = () => {
    const headerHeight = 35;
    const rowHeight = 90;
    const availableHeight = window.innerHeight - headerHeight;
    const items = Math.floor(availableHeight / rowHeight);
    setItemsPerPage(items);
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroEstado(e.target.value);
    setCurrentPage(1);
  };

  const handleRechazadoClick = async (solicitudId: string) => {
    setModalSolicitudId(solicitudId);
    try {
      const response = await axios.get(
        // `http://localhost:8000/api/solicitudID/${solicitudId}`
        import.meta.env.VITE_API_URL + "/api/solicitudID/" + solicitudId
      );
      setModalText(response.data);
    } catch (error) {
      console.error("Error al obtener el texto de la solicitud:", error);
      setModalText("Error al obtener el texto de la solicitud");
    }
  };

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    if (filtroEstado === "Todos") return true;
    if (filtroEstado === "Cancelado") {
      return (
        solicitud.solicitud.estado === "Cancelado" ||
        solicitud.solicitud.estado === "Rechazado"
      );
    }
    return solicitud.solicitud.estado === filtroEstado;
  });

  const paginatedSolicitudes = solicitudesFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColorMap: Record<string, ChipProps["color"]> = {
    Aceptada: "success",
    Cancelado: "warning",
    Rechazado: "danger",
    Pendiente: "danger",
  };

  return (
    <div className="w-full px-4 sm:px-8">
      <label className="block text-2xl sm:text-3xl font-bold text-gray-900 ">
        RESERVAS DE DOCENTES
      </label>
      <div className="flex justify-center sm:justify-start items-center my-2">
        <div className="w-full sm:w-auto">
          <label
            htmlFor="filtroEstado"
            className="block sm:inline-block mr-2 text-lg text-black"
          >
            <b>Filtrar por estado:</b>
          </label>
          <Select
            className="mt-1 block w-full sm:w-auto"
            style={{ fontSize: "15px" }}
            value={filtroEstado}
            onChange={handleEstadoChange}
            placeholder="Todos"
          >
            <SelectItem key={"Todos"} value="Todos">
              Todos
            </SelectItem>
            <SelectItem key={"Aceptada"} value="Aceptada">
              Aceptada
            </SelectItem>
            <SelectItem key={"Cancelado"} value="Cancelado">
              Cancelado
            </SelectItem>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="custom-table text-center" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              AMBIENTE
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              DOCENTE
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              MATERIA
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              MOTIVO
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              INICIO
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              FIN
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              FECHA
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              PERSONAS
            </TableColumn>
            <TableColumn className="text-center text-xs sm:text-sm bg-slate-300">
              ESTADO
            </TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedSolicitudes.map((solicitud) => (
              <TableRow key={solicitud.solicitud.id}>
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
                  <small>{solicitud.solicitud.fecha_solicitud}</small>
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
      </div>
      <div className="flex justify-center my-4">
        <Pagination
          showControls
          total={Math.ceil(solicitudesFiltradas.length / itemsPerPage)}
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
  );
};
