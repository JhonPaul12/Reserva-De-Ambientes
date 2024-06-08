import { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../Graficos/LinesChart";
import Bars from "../Graficos/BarsChart";
import { AmbienteLineas, AmbientesCont } from "../interfaces/AmbienteDatos";
import { Pagination } from "@nextui-org/react";
import Pies from "../Graficos/PiesChart";

export const InformeAmbientes = () => {
  const [datos, setDatos] = useState<AmbientesCont[]>([]);
  const [datosL, setDatosL] = useState<AmbienteLineas[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAmbientesLineas();
    getAmbientes();
  }, []);

  const getAmbientesLineas = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/informeAmbientes2_v2`
      );
      setDatosL(response.data);
    } catch (error) {
      console.error("Error al obtener datos", error);
    }
  };
  
  const getAmbientes = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/informeAmbientes_v2`
      );
      setDatos(response.data);
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
          <div className="p-12 w-full">
            <p className="m-2">GRÁFICO DE BARRAS</p>
            <div className="w-full bg-light px-2" style={{ height: "50vh" }}>
              <div className="w-full flex justify-center" style={{ height: "100%" }}>
                <Bars data={datos} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-12 w-full" >
            <p className="m-2">GRÁFICO DE LÍNEAS</p>
            <div className="w-full bg-light px-2" style={{ height: "50vh" }}>
              <div className="w-full flex justify-center" style={{ height: "100%" }}>
                <LineChart datos={datosL} />
              </div>
            </div>
          </div>
        );
        case 3:
        return (
          <div className="p-12 w-full" >
            <p className="m-2">GRÁFICO PIE</p>
            <div className="w-full bg-light px-2" style={{ height: "50vh" }}>
              <div className="w-full flex justify-center" style={{ height: "100%" }}>
                <Pies datos={datos}/>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className=" text-black text-3xl w-full">
        {renderChart()}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination showControls total={3} onChange={handlePageChange} />
      </div>
    </div>
  );
  
};
