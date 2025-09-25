import { ChartData } from "chart.js";
import { Chart, ChartProps } from "primereact/chart";

interface DoughnutChartProps extends ChartProps {
    maleCount: number;
    femaleCount: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ maleCount, femaleCount, ...props }) => {
    const data: ChartData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Total",
                data: [maleCount, femaleCount],
                backgroundColor: ["#3F1562", "#C186F4"],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 10,
                    boxHeight: 10,
                },
            },
            tooltip: {
                titleColor: "#000000",
                borderColor: "#C186F4",
                backgroundColor: "#FFFFFF",
                bodyColor: "#000000",
                borderWidth: 1,
                titleFont: {
                    family: "Manrope",
                },
                bodyFont: {
                    family: "Manrope",
                },
            },
        },
        // cutout: "60%",
        radius: "80%",
    };

    return (
        <div className="w-full">
            <Chart
                {...props}
                className="md:h-[300px] h-[150px]"
                type="doughnut"
                data={data}
                options={options}
            />
        </div>
    );
};

export default DoughnutChart;
