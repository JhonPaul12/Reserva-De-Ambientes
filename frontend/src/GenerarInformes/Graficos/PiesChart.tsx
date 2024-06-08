import { Chart as ChartJs, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJs.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            color: 'black',
            anchor: 'end',
            align: 'start',
            formatter: (value: number) => `Cant: ${value}`,
            font: {
                weight: 'bold'
            }
        }
    }
};

interface PiesProps {
    datos: { Aulas: string; Cantidad_de_Reservas: number; }[];
}

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
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

export default function Pies({ datos }: PiesProps) {
    const labels = datos.map(d => d.Aulas);
    const dataValues = datos.map(d => d.Cantidad_de_Reservas);

    const backgroundColors = dataValues.map(() => getRandomColor());
    const softBackgroundColors = backgroundColors.map(color => getSoftColor(color, 1));

    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad de Reservas',
                data: dataValues,
                backgroundColor: softBackgroundColors,
                borderColor: backgroundColors,
                borderWidth: 3,
            }
        ]
    };

    return <Pie data={data} options={options} />;
}
