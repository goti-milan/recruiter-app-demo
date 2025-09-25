import { ChartData, ChartOptions } from "chart.js";
import { Chart, ChartProps } from "primereact/chart";
import React from "react";

interface LineChartProps extends ChartProps {
    data: ChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data, ...props }) => {

    const options: ChartOptions = {
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                titleColor: "#000000",
                borderColor: "#FC5F5F",
                boxWidth: 1,
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
        scales: {
            x: {
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    display: true,
                    callback: (value: string | number) => {
                        return typeof value === 'number' && value % 1 === 0 ? `${value}` : ''; // return only integer values
                    }
                },
                grid: {
                    display: false,
                },
            },
        },
    };
    return (
        <div className="w-full">
            <Chart
                {...props}
                className="md:h-[300px] h-[150px]"
                type="line"
                data={data}
                options={options}
            />
        </div>
    );
};

export default LineChart;