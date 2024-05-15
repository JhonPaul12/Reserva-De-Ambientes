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
    const Libres = respuesta.data.filter(
      (solicitud) => solicitud.estado === "libre"
    );
    setPeriodo(Libres);
  };

  const filtrarPeriodos = () => {
    return periodos.filter((periodo) => {
      return (
        (filtroAula === "" || periodo.ambiente.nombre.includes(filtroAula)) &&
        (filtroCapacidad === null || periodo.ambiente.capacidad >= (filtroCapacidad || 0)) &&
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

  if (
    filtroAula === "" &&
    filtroCapacidad === null &&
    filtroTipo === ""
  ) {
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

  return (
    <div className="contenedor-table">
      <label className="ml-10 text-3xl font-bold text-center text-gray-900">
        BUSQUEDA POR FILTROS
      </label>
      <div className="p-5">
        <input
          type="text"
          placeholder="AULA"
          className="input"
          value={filtroAula}
          onChange={(e) => setFiltroAula(e.target.value)}
        />
        <input
          type="number"
          placeholder="CAPACIDAD"
          className="input"
          value={filtroCapacidad || ""}
          onChange={(e) => setFiltroCapacidad(parseInt(e.target.value))}
        />
        <select
          className="input"
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Seleccione tipo...</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Aula">Aula</option>
          <option value="Multifuncional">Multifuncional</option>
        </select>
      </div>
      <section className="mx-6 my-4">
        <Table className="custom-table" aria-label="Tabla de datos">
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Aula
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Tipo de aula
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Capacidad
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Ubicación
            </TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">
              Horarios
            </TableColumn>
          </TableHeader>
          <TableBody>
            {uniqueAulas.map((aula, index) => {
              const periodosAula = periodosFiltrados.filter(
                (periodo) => periodo.ambiente.nombre === aula
              );
              return (
                <TableRow key={index}>
                  <TableCell className="text-base text-black">{aula}</TableCell>
                  <TableCell className="text-base text-black">
                    {periodosAula[0]?.ambiente.tipo}
                  </TableCell>
                  <TableCell className="text-base text-black">
                    {periodosAula[0]?.ambiente.capacidad}
                  </TableCell>
                  <TableCell className="text-base text-black">
                    {periodosAula[0]?.ambiente.ubicacion}
                  </TableCell>
                  <TableCell className="text-base text-black">
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
      </section>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="custom-modal"
      >
        <ModalHeader>Horario de Aula</ModalHeader>
        <ModalContent>
          <h2 className="p-2 text-center">Horarios para {aulaSeleccionada[0]?.ambiente.nombre}</h2>
          <div className="p-5 w-full">
            <input
              type="text"
              placeholder="Filtrar por hora"
              className="input w-full"
              style={{ width: "100%" }}
              value={filtroHoraModal}
              onChange={handleHoraModalChange}
            />
          </div>
          <div className="modal-table">
            <Table className="custom-table">
              <TableHeader>
                <TableColumn className="text-center text-3xl bg-slate-300">
                  Fecha
                </TableColumn>
                <TableColumn className="text-center text-3xl bg-slate-300">
                  Hora de inicio
                </TableColumn>
                <TableColumn className="text-center text-3xl bg-slate-300">
                  Hora final
                </TableColumn>
              </TableHeader>
              <TableBody>
                {filtrarPeriodosModal().map((periodo, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-base text-black">
                      {periodo.fecha}
                    </TableCell>
                    <TableCell className="text-base text-black">
                      {periodo.horario.hora_inicio}
                    </TableCell>
                    <TableCell className="text-base text-black">
                      {periodo.horario.hora_fin}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            className="m-2 p-5 bg-danger text-white"
            onClick={() => setModalOpen(false)}
          >
            Cerrar
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};
