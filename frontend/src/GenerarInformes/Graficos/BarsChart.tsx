import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { AmbientesCont } from "../interfaces/AmbienteDatos";
import { Button } from "@nextui-org/react";
import { IoIosPrint } from "react-icons/io";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Bars = ({ data }: { data: AmbientesCont[] }) => {
  const componentRef = useRef(null);

  const labels = data.map((item) => item.Aulas);
  const dataset = data.map((item) => item.Cantidad_de_Reservas);

  const totalReservas = dataset.reduce((sum, value) => sum + value, 0);
  const maxReservas = Math.max(...dataset);
  const minReservas = Math.min(...dataset);
  const aulaMaxReservas = labels[dataset.indexOf(maxReservas)];
  const aulaMinReservas = labels[dataset.indexOf(minReservas)];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de Reservas",
        data: dataset,
        backgroundColor: "rgba(0,100,195,0.5)",
      },
    ],
  };

  const misOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Aulas",
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Cantidad de Reservas",
          font: {
            size: 16,
          },
        },
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
        grid: {
          display: true,
          color: "rgba(200,200,200,0.3)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: [
          "Cantidad de reservas por ambiente",
          `Total de Reservas: ${totalReservas}`,
          `Aula con más reservas: ${aulaMaxReservas} (${maxReservas})`,
          `Aula con menos reservas: ${aulaMinReservas} (${minReservas})`,
        ],
        font: {
          size: 16,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.raw as number);
            return label;
          },
        },
      },
    },
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
      <div
        className="print-container w-full h-full"
        ref={componentRef}
      >
        <div className="chart-container w-full h-full">
          <Bar data={chartData} options={misOptions} />
        </div>
      </div>
      <div className="print-button-container">
        <ReactToPrint
          trigger={() => (
            <Button
              className="text-white"
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
};

export default Bars;
