import React, { useEffect } from 'react';
import Chart from "chart.js";

export default function ChartDonut(props) {
    const chartRef = React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        var donutChart;
        donutChart=new Chart(myChartRef, {
            type: 'doughnut',
            data: props.data,
            options: {
                responsive:true,
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });


        return () => {
            donutChart.destroy()

        }
    })
    return (
        <div className='chart-area'>
        <div className="chart-pie">
            <canvas id={`${props.id}`} ref={chartRef}></canvas>
        </div>

    </div>
    )
}
