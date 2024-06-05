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
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IReservaA } from "../interface/IReservaA";

export const VerReservaAdmin = () => {
  const [solicitudes, setSolicitudes] = useState<IReservaA[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("Todos");
  const [modalSolicitudId, setModalSolicitudId] = useState<string | null>(null);
  const [modalText, setModalText] = useState<string>("");

  useEffect(() => {
    getSolicitudes();
  }, []);

  const getSolicitudes = async () => {
    const respuesta = await axios.get(
      `http://127.0.0.1:8000/api/periodoSolicitud2`
    );
    setSolicitudes(respuesta.data);
    console.log(respuesta.data);
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroEstado(e.target.value);
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

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    if (filtroEstado === "Todos") return true;
    return solicitud.solicitud.estado === filtroEstado;
  });
  const statusColorMap: Record<string, ChipProps["color"]> = {
    Aceptada: "success",
    Cancelada: "danger",
    Rechazado: "danger",
    Pendiente: "danger",
  };

  return (
    <div className="w-full">
      <label className="ml-10 text-3xl font-bold text-gray-900">RESERVAS</label>
      <div className="flex flex-col justify-center items-center my-4">
        <div className=" mb-3 mx-4">
          <label htmlFor="filtroEstado" className="mr-2 text-lg text-black">
            <b>Filtrar por estado:</b>
          </label>
          <Select
            className="mt-3 block"
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
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
            <SelectItem key={"Rechazado"} value="Rechazado">
              Rechazado
            </SelectItem>
          </Select>
        </div>
      </div>
      <Table className="custom-table text-center" aria-label="Tabla de datos">
        <TableHeader>
          <TableColumn className="text-center text-sm bg-slate-300">
            AMBIENTE
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            DOCENTE
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            MATERIA
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            MOTIVO
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            INICIO
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            FIN
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            FECHA
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            PERSONAS
          </TableColumn>
          <TableColumn className="text-center text-sm bg-slate-300">
            ESTADO
          </TableColumn>
        </TableHeader>
        <TableBody>
          {solicitudesFiltradas.map((solicitud) => (
            <TableRow>
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
                {solicitud.periodos[0].periodo.horario.hora_inicio.slice(0, -3)}
              </TableCell>
              <TableCell className="text-xs text-black">
                {solicitud.periodos[
                  solicitud.periodos.length - 1
                ].periodo.horario.hora_fin.slice(0, -3)}
              </TableCell>
              <TableCell className="text-xs text-black">
                <small>{solicitud.periodos[0].periodo.fecha}</small>
              </TableCell>
              <TableCell className="text-xs text-black">
                {solicitud.solicitud.numero_estudiantes}
              </TableCell>
              <TableCell className="text-xs text-black">
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
                        handleRechazadoClick(solicitud.solicitud.id.toString())
                      }
                    >
                      {solicitud.solicitud.estado}
                    </Chip>
                    <Link
                      className="text-xs"
                      underline="always"
                      color="danger"
                      onClick={() =>
                        handleRechazadoClick(solicitud.solicitud.id.toString())
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
  );
};
