import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { AmbienteLineas } from "../interfaces/AmbienteDatos";
import { Button } from "@nextui-org/react";
import { IoIosPrint } from "react-icons/io";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ datos }: { datos: AmbienteLineas[] }) => {
  const componentRef = useRef(null);

  const meses = Array.from(
    new Set(datos.flatMap((aula) => aula.Meses.map((mes) => mes.mes)))
  );

  const datasets = datos.map((aula) => {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return {
      label: `Aula ${aula.Aula}`,
      data: meses.map((mes) => {
        const mesData = aula.Meses.find((m) => m.mes === mes);
        return mesData ? mesData.cantidad : 0;
      }),
      tension: 0.5,
      fill: false,
      borderColor: color,
      backgroundColor: color,
      pointBorderColor: color,
      pointBackgroundColor: color,
    };
  });

  const data = {
    labels: meses,
    datasets: datasets,
  };

  const reservasPorMes = meses.map((mes) => {
    return datasets.reduce((total, dataset) => {
      const mesIndex = data.labels.indexOf(mes);
      return total + (dataset.data[mesIndex] || 0);
    }, 0);
  });

  const reservasNoCero = reservasPorMes.filter((reserva) => reserva > 0);

  const maxReservas = Math.max(...reservasPorMes);
  const minReservas = Math.min(...reservasNoCero);
  const mesMaxReservas = meses[reservasPorMes.indexOf(maxReservas)];
  const mesMinReservas = meses[reservasPorMes.indexOf(minReservas)];

  const misOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
          font: {
            size: 20,
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
          "Cantidad de reservas de ambientes por fecha",
          `Mes con más reservas: ${mesMaxReservas} (${maxReservas})`,
          `Mes con menos reservas: ${mesMinReservas} (${minReservas})`,
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
        className="print-container w-full h-full d-flex justify-content-center align-items-center"
        ref={componentRef}
      >
        <div className="chart-container">
          <Line data={data} options={misOptions} />
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
};

export default LineChart;
