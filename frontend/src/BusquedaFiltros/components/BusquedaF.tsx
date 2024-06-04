import { useEffect, useState } from "react";
import "./estilosBusq.css";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  Select,
  SelectItem,
  Input,
  ModalFooter,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import axios from "axios";
import { Periodo } from "../../BusquedaFiltros/interfaces/Ambiente";

export const BusquedaF = () => {
  const [periodos, setPeriodo] = useState<Periodo[]>([]);
  const [filtroAula, setFiltroAula] = useState<string>("");
  const [filtroCapacidad, setFiltroCapacidad] = useState<number | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [aulaSeleccionada, setAulaSeleccionada] = useState<Periodo[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [filtroHoraModal, setFiltroHoraModal] = useState<string>("");

  useEffect(() => {
    getPeriodos();
  }, []);

  const getPeriodos = async () => {
    const respuesta = await axios.get<Periodo[]>(
      `http://127.0.0.1:8000/api/allPeriodos`
    );
    const Libres = respuesta.data;
    setPeriodo(Libres);
  };

  const filtrarPeriodos = () => {
    return periodos.filter((periodo) => {
      return (
        (filtroAula === "" || periodo.ambiente.nombre.includes(filtroAula)) &&
        (filtroCapacidad === null ||
          periodo.ambiente.capacidad >= (filtroCapacidad || 0)) &&
        (filtroTipo === "" || periodo.ambiente.tipo === filtroTipo)
      );
    });
  };

  const handleAulaClick = (aula: string) => {
    const periodosAula = periodos.filter(
      (periodo) => periodo.ambiente.nombre === aula
    );
    setAulaSeleccionada(periodosAula);
    setModalOpen(true);
  };

  let periodosFiltrados = filtrarPeriodos();

  if (filtroAula === "" && filtroCapacidad === null && filtroTipo === "") {
    periodosFiltrados = periodos;
  }

  const uniqueAulas = Array.from(
    new Set(periodosFiltrados.map((periodo) => periodo.ambiente.nombre))
  );

  const filtrarPeriodosModal = () => {
    return aulaSeleccionada.filter((periodo) => {
      return (
        filtroHoraModal === "" ||
        periodo.horario.hora_inicio.includes(filtroHoraModal)
      );
    });
  };

  const handleHoraModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroHoraModal(e.target.value);
  };
  const statusColorMap: Record<string, ChipProps["color"]>  = {
    libre: "success"
  };

  return (
    <div className="contenedor-table">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900 mb-5">
        BUSQUEDA POR FILTROS
      </label>
      <div className="flex flex-row justify-center items-center my-4">
        {/* Componentes de filtros */}
        <div className="mb-3 mx-4 ">
          <label htmlFor="filtroNombre" className="block text-gray-700 text-bold">
            <b> Filtrar por nombre: </b>
          </label>
        <Input
          type="text"
          placeholder="Ej: 690A"
          className="mt-3 block"
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          value={filtroAula}
          onChange={(e) => setFiltroAula(e.target.value)}
        />
        </div>
        <div className="mb-3 mx-4 ">
          <label htmlFor="filtroNombre" className="block text-gray-700 text-bold">
            <b> Filtrar por capacidad: </b>
          </label>
        <Input
          type="number"
          placeholder="Ej: 100"
          className="mt-3 block"
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          value={filtroCapacidad || ""}
          onChange={(e) => setFiltroCapacidad(parseInt(e.target.value))}
        />
        </div>
        <div className="mb-3 mx-4 ">
          <label htmlFor="filtroNombre" className="block text-gray-700 text-bold">
            <b> Filtrar por tipo: &nbsp; &nbsp; </b>
          </label>
        <Select
          placeholder='Todos'
          className="mt-3 block"
            style={{
              fontSize: "15px",
              padding: "10px",
            }}
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <SelectItem key={''} value="">Todos</SelectItem>
          <SelectItem key={"Multifuncional"} value="Multifuncional">
              Multifuncional
            </SelectItem>
            <SelectItem key={"Aula"} value="Aula">
              Aula
            </SelectItem>
            <SelectItem key={"Laboratorio"} value="Laboratorio">
              Laboratorio
            </SelectItem>
        </Select>
        </div>
      </div>
      <div className="mx-6 my-4 sm:mx-auto w-full max-w-screen-md">
        <Table className="custom-table text-center" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-sm bg-slate-300">
              AMBIENTE
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              TIPO
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              CAPACIDAD
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              UBICACIÓN
            </TableColumn>
            <TableColumn className="text-center text-sm bg-slate-300">
              HORARIOS
            </TableColumn>
          </TableHeader>
          <TableBody>
            {uniqueAulas.map((aula, index) => {
              const periodosAula = periodosFiltrados.filter(
                (periodo) => periodo.ambiente.nombre === aula
              );
              return (
                <TableRow key={index}>
                  <TableCell className="text-xs text-black">{aula}</TableCell>
                  <TableCell className="text-xs text-black">
                    {periodosAula[0]?.ambiente.tipo}
                  </TableCell>
                  <TableCell className="text-xs text-black">
                    {periodosAula[0]?.ambiente.capacidad}
                  </TableCell>
                  <TableCell className="text-xs text-black">
                    {periodosAula[0]?.ambiente.ubicacion}
                  </TableCell>
                  <TableCell className="text-xs text-black">
                    <Button
                      className="bg-primary text-white"
                      onClick={() => handleAulaClick(aula)}
                    >
                      Horarios
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="custom-modal"
      >
        <ModalHeader>Horario de Aula</ModalHeader>
        <ModalContent>
          <h2 className="p-2 text-center">
            Horarios para {aulaSeleccionada[0]?.ambiente.nombre}
          </h2>
          <div className="p-5 w-full">
            <Input
              type="text"
              placeholder="Filtrar por hora"
              className="mt-3 block"
                style={{
                  fontSize: "15px",
                  padding: "10px",
                }}
              value={filtroHoraModal}
              onChange={handleHoraModalChange}
            />
          </div>
          <div className="modal-table">
            <Table className="custom-table text-center">
              <TableHeader>
                <TableColumn className="text-center text-sm bg-slate-300">
                  FECHA
                </TableColumn>
                <TableColumn className="text-center text-sm bg-slate-300">
                  INICIO
                </TableColumn>
                <TableColumn className="text-center text-sm bg-slate-300">
                  FIN
                </TableColumn>
                <TableColumn className="text-center text-sm bg-slate-300">
                  ESTADO
                </TableColumn>
              </TableHeader>
              <TableBody>
                {filtrarPeriodosModal().map((periodo, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs text-black">
                      {periodo.fecha}
                    </TableCell>
                    <TableCell className="text-xs text-black">
                      {periodo.horario.hora_inicio.slice(0, -3)}
                    </TableCell>
                    <TableCell className="text-xs text-black">
                      {periodo.horario.hora_fin.slice(0, -3)}
                    </TableCell>
                    <TableCell className="text-xs text-black">
                          <Chip className="capitalize" color={statusColorMap[periodo.estado]} size="sm" variant="flat"
                          >
                            {periodo.estado}
                          </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ModalFooter>
          <Button
            className="m-2 p-5 bg-danger text-white"
            onClick={() => setModalOpen(false)}
          >
            Cerrar
          </Button>
          </ModalFooter>
          
        </ModalContent>
      </Modal>
      
      </div>
    </div>
  );
};
