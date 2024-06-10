import { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectItem } from "@nextui-org/react";
import Bars from "../../GenerarInformes/Graficos/BarsChart";
import LineChart from "../../GenerarInformes/Graficos/LinesChart";
import { Table } from "../../GenerarInformes/Graficos/Table";
import { Pagination } from "@nextui-org/react";

interface Docente {
  id: number;
  nombre: string;
}

export const InformeDocente = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [datosT, setDatosT] = useState<any[]>([]);
  const [datos, setDatos] = useState<any[]>([]);
  const [datosL, setDatosL] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getDocentes();
  }, []);

  const getDocentes = async () => {
    try {
      const response = await axios.get<Docente[]>(
        "http://127.0.0.1:8000/api/datosDocente"
      );
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al obtener datos de los docentes", error);
    }
  };

  const handleSelectChange = (userId: number) => {
    setSelectedUserId(userId);
    getTable(userId);
    getAmbientes(userId);
    getAmbientesLineas(userId);
  };

  const getTable = async (userId: number) => {
    try {
      const response = await axios.get<any[]>(
        `http://127.0.0.1:8000/api/informeAmbientesTableID/${userId}`
      );
      setDatosT(response.data);
    } catch (error) {
      console.error("Error al obtener datos de la tabla", error);
    }
  };

  const getAmbientes = async (userId: number) => {
    try {
      const response = await axios.get<any[]>(
        `http://127.0.0.1:8000/api/informeAmbientes_v2ID/${userId}`
      );
      setDatos(response.data);
    } catch (error) {
      console.error("Error al obtener datos de ambientes", error);
    }
  };

  const getAmbientesLineas = async (userId: number) => {
    try {
      const response = await axios.get<any[]>(
        `http://127.0.0.1:8000/api/informeAmbientes2_v2ID/${userId}`
      );
      setDatosL(response.data);
    } catch (error) {
      console.error("Error al obtener datos de ambientes lineales", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return <Bars data={datos} />;
      case 2:
        return <LineChart datos={datosL} />;
      case 3:
        return <Table data={datosT} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 w-full h-screen flex flex-col">
      <Select
        className="max-w-xs pb-2"
        label="Selecciona un docente"
        value={selectedUserId ? selectedUserId.toString() : ""}
        onChange={(e) => handleSelectChange(parseInt(e.target.value))}
      >
        {docentes.map((docente) => (
          <SelectItem key={docente.id} value={docente.id.toString()}>
            {docente.nombre}
          </SelectItem>
        ))}
      </Select>
      <div className="flex-grow flex items-center justify-center text-black">
        {renderChart()}
      </div>
      <div className="flex justify-center">
        <Pagination showControls total={3} onChange={handlePageChange} />
      </div>
    </div>
  );
};
