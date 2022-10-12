import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';


const LineChart = ({data}) => {
    console.log(data)
    return (
        <div className="chart" style={{ width: "80%" }}>
            <Line data={data} />
        </div>
    );
};

export default LineChart;