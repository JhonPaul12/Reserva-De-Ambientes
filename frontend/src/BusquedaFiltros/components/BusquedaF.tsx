import { useEffect, useState } from "react";
import "./estilosBusq.css";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { Periodo } from "../../BusquedaFiltros/interfaces/Ambiente";

export const BusquedaF = () => {
  const [periodos, setPeriodo] = useState<Periodo[]>([]);
  const [filtroAula, setFiltroAula] = useState<string>("");
  const [filtroCapacidad, setFiltroCapacidad] = useState<number | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [filtroHoraInicio, setFiltroHoraInicio] = useState<string>("");

  useEffect(() => {
    getPeriodos();
  }, []);

  const getPeriodos = async () => {
    const respuesta = await axios.get<Periodo[]>(`http://127.0.0.1:8000/api/allPeriodos`);
    const Libres = respuesta.data.filter((solicitud) => solicitud.estado === 'libre');
    setPeriodo(Libres);
  };

  const filtrarPeriodos = () => {
    return periodos.filter(periodo => {
      return (
        (filtroAula === "" || periodo.ambiente.nombre.includes(filtroAula)) &&
        (filtroCapacidad === null || periodo.ambiente.capacidad >= filtroCapacidad) &&
        (filtroTipo === "" || periodo.ambiente.tipo === filtroTipo) &&
        (filtroHoraInicio === "" || periodo.horario.hora_inicio.includes(filtroHoraInicio))
      );
    });
  };

  return (
    <div className="contenedor-table">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>BUSQUEDA POR FILTROS</label>
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
        <input
          type="text"
          placeholder="HORA DE INICIO"
          className="input"
          value={filtroHoraInicio}
          onChange={(e) => setFiltroHoraInicio(e.target.value)}
        />
      </div>
      <section className="mx-6 my-4">
        <Table
          className="custom-table"
          aria-label="Tabla de datos"
        >
          <TableHeader>
            <TableColumn className="text-center text-3xl bg-slate-300" >Aula</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Tipo de aula</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Hora de inicio</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Capacidad</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Ubicación</TableColumn>
            <TableColumn className="text-center text-3xl bg-slate-300">Fecha</TableColumn>
          </TableHeader>
          <TableBody>
            {filtrarPeriodos().map((periodo) => (
              <TableRow key={periodo.id}>
                <TableCell className="text-base text-black">{periodo.ambiente.nombre}</TableCell>
                <TableCell className="text-base text-black">{periodo.ambiente.tipo}</TableCell>
                <TableCell className="text-base text-black">{periodo.horario.hora_inicio}</TableCell>
                <TableCell className="text-base text-black">{periodo.ambiente.capacidad}</TableCell>
                <TableCell className="text-base text-black">{periodo.ambiente.ubicacion}</TableCell>
                <TableCell className="text-base text-black">{periodo.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
