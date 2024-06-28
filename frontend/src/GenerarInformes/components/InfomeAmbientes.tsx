import { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../Graficos/LinesChart";
import Bars from "../Graficos/BarsChart";
import {
  AmbienteLineas,
  AmbientesCont,
  AulaReservada,
} from "../interfaces/AmbienteDatos";
import { Pagination } from "@nextui-org/react";
import Pies from "../Graficos/PiesChart";
import { Table } from "../Graficos/Table";

export const InformeAmbientes = () => {
  const [datos, setDatos] = useState<AmbientesCont[]>([]);
  const [datosL, setDatosL] = useState<AmbienteLineas[]>([]);
  const [datosT, setDatosT] = useState<AulaReservada[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAmbientesLineas();
    getAmbientes();
    getTable();
  }, []);

  const getAmbientesLineas = async () => {
    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/informeAmbientes2_v2`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/informeAmbientes2_v2"
      );
      setDatosL(response.data);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };

  const getAmbientes = async () => {
    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/informeAmbientes_v2`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/informeAmbientes_v2"
      );
      setDatos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };
  const getTable = async () => {
    try {
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/informeAmbientesTable`
      // );
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/informeAmbientesTable"
      );
      setDatosT(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="w-full h-full" style={{ height: "80vh" }}>
            <Bars data={datos} />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full" style={{ height: "80vh" }}>
            <LineChart datos={datosL} />
          </div>
        );
      case 3:
        return (
          <div className="w-full " style={{ height: "80vh" }}>
            <Pies datos={datos} />
          </div>
        );
      case 4:
        return <Table data={datosT} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 w-full h-screen flex flex-col">
      <div className=" text-black">
        {renderChart()}
      </div>
      <div className="flex justify-center">
        <Pagination showControls total={4} onChange={handlePageChange} />
      </div>
    </div>
  );
};
