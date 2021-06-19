import React, { useEffect } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontColor = '#858796';
var pieChart;
export default function ChartPie(props) {
    const chartRef=React.createRef();
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");

        if (typeof pieChart !== "undefined"){
            pieChart.destroy() 
        }
        pieChart=new Chart(myChartRef, {
            type: 'pie',
            data: props.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,

            }

        });


    }, )
    return (
        <div className='chart-area'>
            <div className='h6'>{props.title}</div>
            <div className='chart-pie'>
                <canvas id={`${props.id}`} ref={chartRef} ></canvas>
            </div>
        </div>
    )
}

