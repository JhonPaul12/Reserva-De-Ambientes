import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { AmbientesCont } from "../interfaces/AmbienteDatos";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const misOptions: ChartOptions<'bar'> = {
  scales: {
    y: {
      ticks: {
        callback: function(value) {
          return Number.isInteger(value) ? value : null;
        }
      }
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += Math.round(context.raw as number);
          return label;
        }
      }
    }
  }
};

const Bars = ({ data }: { data: AmbientesCont[] }) => {
  const labels = data.map(item => item.Aulas);
  const dataset = data.map(item => item.Cantidad_de_Reservas);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de Reservas",
        data: dataset,
        backgroundColor: "rgba(0,220,195,0.5)",
      },
    ],
  };

  return <Bar data={chartData} options={misOptions} />;
};

export default Bars;
