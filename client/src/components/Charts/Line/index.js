import React, { useEffect } from 'react';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = 'Nunito';
Chart.defaults.global.defaultFontColor = '#858796';

 function ChartLine(props) {
    // var linechart;
    const chartRef = React.createRef();
    console.log('charline',props)
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        var linechart;
        linechart = new Chart(myChartRef, {
            type: 'line',
            data: props.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 10
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 5,
                            padding: 10,
                            // Include a dollar sign in the ticks
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ':' + tooltipItem.yLabel;
                        }
                    }
                }
            }
        });
        return () => {

                linechart.destroy()
            
        }
    })
    return (
        <div className="chart-area">
            <div className='h6'>{props.title}</div>
            <div className='chart-pie'>
                <canvas id={`${props.id}`} ref={chartRef}></canvas>
            </div>
        </div>

    )

}
export default React.memo(ChartLine)
