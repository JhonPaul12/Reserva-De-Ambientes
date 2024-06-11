import { useRef } from "react";
import ReactToPrint from "react-to-print";
import {
  Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { AmbientesCont } from "../interfaces/AmbienteDatos";
import { Button } from "@nextui-org/react";
import { IoIosPrint } from "react-icons/io";

ChartJs.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: "black",
      anchor: "end",
      align: "start",
      formatter: (value: number) => `Cant: ${value}`,
      font: {
        weight: "bold",
      },
    },
    title: {
      display: true,
      text: "Cantidad de reservas por ambiente",
      font: {
        size: 20,
      },
      padding: {
        bottom: 20,
      },
    },
  },
};

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getSoftColor = (color: string, opacity: number): string => {
  let r: number = parseInt(color.slice(1, 3), 16);
  let g: number = parseInt(color.slice(3, 5), 16);
  let b: number = parseInt(color.slice(5, 7), 16);

  r = Math.floor((r + 255) / 2);
  g = Math.floor((g + 255) / 2);
  b = Math.floor((b + 255) / 2);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function Pies({ datos }: { datos: AmbientesCont[] }) {
  const componentRef = useRef(null);

  const labels = datos.map((d) => d.Aulas);
  const dataValues = datos.map((d) => d.Cantidad_de_Reservas);

  const backgroundColors = dataValues.map(() => getRandomColor());
  const softBackgroundColors = backgroundColors.map((color) =>
    getSoftColor(color, 1)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad de Reservas",
        data: dataValues,
        backgroundColor: softBackgroundColors,
        borderColor: backgroundColors,
        borderWidth: 3,
      },
    ],
  };

  const pageStyle = `
  @media print {
    body, html, .print-container {
      height: 100%;
      width: 100%; 
      padding: 5px;
    }
    .chart-container canvas {
      width: 100% !important; 
      height: auto !important;
    }
  }
`;

  return (
    <div className="w-full h-full">
      <div className="print-container w-full h-full" ref={componentRef}>
        <div className="chart-container w-full h-full">
          <Pie data={data} options={options} />
        </div>
      </div>
      <div className="print-button-container">
        <ReactToPrint
          trigger={() => (
            <Button
              color="success"
              variant="shadow"
              endContent={<IoIosPrint />}
              style={{ marginLeft: "80%" }}
            >
              Imprimir
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={pageStyle}
        />
      </div>
    </div>
  );
}
