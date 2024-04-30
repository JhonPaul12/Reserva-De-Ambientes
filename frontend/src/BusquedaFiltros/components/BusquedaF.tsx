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
import { Ambiente,Periodo,Horario } from "../../BusquedaFiltros/interfaces/Ambiente"; 


export const BusquedaF = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [busquedaNombre, setBusquedaNombre] = useState<string>("");
  const [busquedaCapacidad, setBusquedaCapacidad] = useState<number | null>(null);
  const [busquedaTipo, setBusquedaTipo] = useState<string>("");
  const [busquedaHora, setBusquedaHora] = useState<string>("");

  useEffect(() => {
    obtenerDatos();
  }, [busquedaNombre, busquedaCapacidad, busquedaTipo, busquedaHora]);

  const obtenerDatos = async () => {
    try {
      const periodosRespuesta = await axios.get(`http://127.0.0.1:8000/api/periodo/`);
      const periodos: Periodo[] = periodosRespuesta.data;

      const ambientesRespuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
      const ambientes: Ambiente[] = ambientesRespuesta.data;

      const horariosRespuesta = await axios.get(`http://127.0.0.1:8000/api/horario/`);
      const horarios: Horario[] = horariosRespuesta.data;

      const datosFiltrados = periodos.filter(periodo => periodo.estado === "libre")
        .map(periodo => {
          const ambiente = ambientes.find(a => a.id === periodo.id_ambiente);
          const horario = horarios.find(h => h.id === periodo.id_horario);

          return {
            aula: ambiente ? ambiente.nombre : "",
            tipo: ambiente ? ambiente.tipo : "",
            hora_inicio: horario ? horario.hora_inicio : "",
            capacidad: ambiente ? ambiente.capacidad : 0,
            ubicacion: ambiente ? ambiente.ubicacion : "",
            fecha: formatoFecha(periodo.fecha),
          };
        });

      const datosFiltradosBusqueda = datosFiltrados.filter((dato) => {
        let nombreMatch = true;
        let capacidadMatch = true;
        let tipoMatch = true;
        let horaMatch = true;

        if (busquedaNombre) nombreMatch = dato.aula.toLowerCase().includes(busquedaNombre.toLowerCase());

        if (busquedaCapacidad !== null)   capacidadMatch = dato.capacidad === busquedaCapacidad;

        if (busquedaTipo)   tipoMatch = dato.tipo.toLowerCase() === busquedaTipo.toLowerCase();

        if (busquedaHora) {
          horaMatch = dato.hora_inicio.toLowerCase().includes(busquedaHora.toLowerCase());
        }

        return nombreMatch && capacidadMatch && tipoMatch && horaMatch;
      });

      setDatos(datosFiltradosBusqueda);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleBusquedaNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaNombre(event.target.value);
  };

  const handleBusquedaCapacidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const capacidad = parseInt(event.target.value);
    setBusquedaCapacidad(isNaN(capacidad) ? null : capacidad);
  };

  const handleBusquedaTipoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBusquedaTipo(event.target.value);
  };

  const handleBusquedaHoraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusquedaHora(event.target.value);
  };

  const formatoFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const ano = fechaObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="contenedor-table">
      <label className='ml-10 text-3xl font-bold text-center text-gray-900'>BUSQUEDA POR FILTROS</label>
      <div className="p-5">
        <input
          type="text"
          placeholder="AULA"
          value={busquedaNombre}
          onChange={handleBusquedaNombreChange}
          className="input"
        />
        <input
          type="number"
          placeholder="CAPACIDAD"
          value={busquedaCapacidad === null ? "" : busquedaCapacidad}
          onChange={handleBusquedaCapacidadChange}
          className="input"
        />
        <select
          value={busquedaTipo}
          onChange={handleBusquedaTipoChange}
          className="input"
        >
          <option value="">Seleccione tipo...</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Aula">Aula</option>
          <option value="Multifuncional">Multifuncional</option>
        </select>
        <input
          type="text"
          placeholder="HORA DE INICIO"
          value={busquedaHora}
          onChange={handleBusquedaHoraChange}
          className="input"
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
            {datos.map((dato, index) => (
              <TableRow key={index}>
                <TableCell className="text-base text-black">{dato.aula}</TableCell>
                <TableCell className="text-base text-black">{dato.tipo}</TableCell> 
                <TableCell className="text-base text-black">{dato.hora_inicio}</TableCell>
                <TableCell className="text-base text-black">{dato.capacidad}</TableCell>
                <TableCell className="text-base text-black">{dato.ubicacion}</TableCell>
                <TableCell className="text-base text-black">{dato.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
