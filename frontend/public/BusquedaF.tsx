import axios from "axios";
import { useEffect, useState } from "react";
import "./estilosBusq.css";

interface Ambiente {
  id: number;
  nombre: string;
  capacidad: number;
  tipo: string;
  ubicacion: string;
}
export const BusquedaF = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [busquedaNombre, setBusquedaNombre] = useState<string>("");
  const [busquedaCapacidad, setBusquedaCapacidad] = useState<number | null>(
    null
  );
  const [busquedaTipo, setBusquedaTipo] = useState<string>("");

  useEffect(() => {
    getAmbientes();
  }, []);

  const getAmbientes = async () => {
    const respuesta = await axios.get(`http://127.0.0.1:8000/api/ambiente/`);
    setAmbientes(respuesta.data);
  };

  const handleBusquedaNombreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusquedaNombre(event.target.value);
  };

  const handleBusquedaCapacidadChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const capacidad = parseInt(event.target.value);
    setBusquedaCapacidad(isNaN(capacidad) ? null : capacidad);
  };

  const handleBusquedaTipoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusquedaTipo(event.target.value);
  };

  const filteredAmbientes = ambientes.filter((ambiente) => {
    let nombreMatch = true;
    let capacidadMatch = true;
    let tipoMatch = true;

    if (busquedaNombre) {
      nombreMatch = ambiente.nombre
        .toLowerCase()
        .includes(busquedaNombre.toLowerCase());
    }

    if (busquedaCapacidad !== null) {
      capacidadMatch = ambiente.capacidad === busquedaCapacidad;
    }

    if (busquedaTipo) {
      tipoMatch = ambiente.tipo === busquedaTipo;
    }

    return nombreMatch && capacidadMatch && tipoMatch;
  });

  return (
    <div className="contenedor">
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
          placeholder="CAPCIDAD"
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
      </div>
      <table className="tabla">
        <thead>
          <tr className="trr">
            <th className="thh">Id</th>
            <th className="thh">Aula</th>
            <th className="thh">Capacidad</th>
            <th className="thh">Tipo</th>
            <th className="thh">Ubicacion</th>
          </tr>
        </thead>
        <tbody>
          {filteredAmbientes.map((ambiente) => {
            return (
              <tr className="trr" key={ambiente.id}>
                <td className="tdd">{ambiente.id}</td>
                <td className="tdd">{ambiente.nombre}</td>
                <td className="tdd">{ambiente.capacidad}</td>
                <td className="tdd">{ambiente.tipo}</td>
                <td className="tdd">{ambiente.ubicacion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
