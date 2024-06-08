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
  const meses = Array.from(
    new Set(datos.flatMap((aula) => aula.Meses.map((mes) => mes.mes)))
  );

  const datasets = datos.map((aula) => {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    //const borderColor = color.replace("0.5", "1");
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

  const misOptions: ChartOptions<"line"> = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    plugins: {
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

  return <Line data={data} options={misOptions} />;
};

export default LineChart;
